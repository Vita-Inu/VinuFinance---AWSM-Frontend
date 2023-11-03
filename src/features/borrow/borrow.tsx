import {ChangeEvent, useEffect, useRef, useState} from 'react';

import {Container} from '@/components/container';
import {BorrowConfirm} from '@/features/borrowConfirm';
import {BorrowSettings} from '@/features/borrowSettings';

import {BorrowPairs} from '../borrowPairs';
import {BorrowPledge} from '../borrowPledge';
import {BorrowLoan} from '../borrowLoan';

import {Step} from './components';
import {Grid, SetupCol, ConfirmCol} from './styled';
import {
    useAccount,
    useBlockNumber,
    useContractRead,
    useContractReads,
    useContractWrite,
    useNetwork,
    usePublicClient, useWaitForTransaction
} from "wagmi";
import {CHAIN_INFO, IControllerAbi, IErc20Abi, IPoolAbi} from "@/const";
import {sha256} from "@noble/hashes/sha256";
import {etherUnits, formatEther, getContract, parseAbiItem, parseEther, parseUnits} from "viem";
import {useDebounce} from "@/hooks/useDebounce";
import {watchBlockNumber, watchReadContracts} from "@wagmi/core";
import {watchBlocks} from "viem/actions";
import {pullAllWith} from "lodash-es";

type PoolInfo = {
    0: `0x{string}`;
    1: `0x{string}`;
    2: number; // maxLoanPerColl
    3: number; // minLoan
    4: number; // loanTenor
    5: number; // totalLiquidity
    6: number; // totalLpShares
    7: number; // rewardCoefficient
    8: number; // loanIdx
}

type Pool = {
    address: `0x{string}`;
    info: PoolInfo;
}

type Pair = {
    collAddress: `0x{string}`;
    collName: string;
    loanAddress: `0x{string}`;
    loanName: string;
}

type Token = {
    address: `0x{string}`;
    decimals: number;
    symbol: string;
}

type SimulatedLoan = {
    0: bigint; // loan amnt
    1: bigint; // repayment amnt
    2: bigint; // reclaimable amnt
    3: bigint; // total fees
    error: string; // optional
}

export type PoolAndSimulationResult = {
    pool: Pool;
    loan: SimulatedLoan;
    loanToken: Token;
    collToken: Token;
}

const ZERO = BigInt(0)

export function Borrow() {
    // The logic here is: use has 2 inputs:
    // 1) input field with value
    // 2) pair selection
    //
    // On first render load all the pools and tokens
    //
    // On selected pair change or value change change poolsToSimulate
    // Every block fetch info from rpc for poolsToSimulate and balance for currentCollateralToken

    const {address} = useAccount()
    const [valueUndebounced, setValue] = useState<string>('0');
    const [lastBlock, setLastBlock] = useState<bigint>(BigInt(0))
    const value = useDebounce<string>(valueUndebounced, 300)
    const {chain} = useNetwork()
    const onValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const value = evt.target.value;
        const convertedValue = Number(value);
        if (convertedValue < 0) return;
        setValue(value);
    };

    let [pools, setPools] = useState<Pool[]>([])
    let [tokens, setTokens] = useState<Token[]>([])
    let [pairs, setPairs] = useState<Pair[]>([])
    let [currentPair, setCurrentPair] = useState<Pair>()
    let pairRef = useRef<Pair>()
    let [collBalance, setCollBalance] = useState('0')
    let [collAllowance, setCollAllowance] = useState<bigint>(ZERO) // raw
    let [simulatedLoans, setSimulatedLoans] = useState<PoolAndSimulationResult[]>()
    let [selectedLoan, setSelectedLoan] = useState<PoolAndSimulationResult>()
    let client = usePublicClient()

    useEffect(() => {
        pairRef.current = currentPair
    }, [currentPair]);

    let block = useBlockNumber({
        watch: true,
    })

    // sub to new blocks
    useEffect(() => {
        if (!block.isSuccess) return
        let newBlock = block.data as bigint
        if (newBlock != lastBlock) {
            setLastBlock(newBlock)
            updateOnchainData(false)
        }
    }, [block]);

    // on load: load pools and tokens
    useEffect(() => {
        const fetchPools = async () => {
            if (!chain) return

            let logs = await client.getLogs({
                event: parseAbiItem('event NewSubPool(address loanCcyToken,address collCcyToken,uint256 loanTenor,uint256 maxLoanPerColl,uint256 r1,uint256 r2,uint256 liquidityBnd1,uint256 liquidityBnd2,uint256 minLoan,uint256 creatorFee,address poolController,uint96 rewardCoefficient)'),
                fromBlock: 'earliest'
            })

            // gather potential pool addresses where controller is our controller
            let potentialPools = logs.filter(x => {
                let chunks = x.data.substring(2).match(/.{1,64}/g)
                if (chunks == null) return false
                // @ts-ignore
                return chunks.length == 12 && chunks[10].endsWith(CHAIN_INFO[chain.id].CONTROLLER.substring(2))
            })

            // dont use getCode, just show whitelisted addresses
            /*
            // use eth_getCode to make sure its a real pool and not a malicious one
            let bytecodes = await Promise.all(potentialPools.map(x => client.getBytecode({address: x.address})))
            let hashes = bytecodes.map(x => {
                if (!x) return ''
                return Buffer.from(sha256(x)).toString('hex');
            })

            // filter by allowed hashes and convert into contract instances
            // @ts-ignore
            let pools = potentialPools.filter((pool, index) => CHAIN_INFO[chain.id].ALLOWED_POOL_HASHES.includes(hashes[index])).map(x => getContract({
                address: x.address,
                abi: IPoolAbi,
                publicClient: client
            }))
            */
            let controller = getContract({
                // @ts-ignore
                address: CHAIN_INFO[chain.id].CONTROLLER,
                abi: IControllerAbi,
                publicClient: client
            })
            // get whitelist boolean for every pool
            let whitelists = await Promise.all(potentialPools.map(x => {
                return controller.read.poolWhitelisted([x.address]) as Promise<boolean>
            }))
            let pools = potentialPools.filter((pool, index) => whitelists[index]).map(x => getContract({
                address: x.address,
                abi: IPoolAbi,
                publicClient: client
            }))

            // gather infos using contract.getPoolInfo
            let infos = await Promise.all(pools.map(x => {
                return x.read.getPoolInfo() as Promise<PoolInfo>
            }))

            setPools(infos.map((info, index) => {
                return {
                    address: pools[index].address as `0x{string}`, // we know this for sure
                    info
                }
            }))

            // @ts-ignore
            let allErcTokens = infos.map(x => x[0]).concat(infos.map(x => x[1])).map(x => getContract({
                address: x,
                publicClient: client,
                abi: IErc20Abi
            }));
            let ercDecimals = await Promise.all(allErcTokens.map(x => {
                return x.read.decimals() as Promise<number>
            }))
            let ercSymbols = await Promise.all(allErcTokens.map(x => {
                return x.read.symbol() as Promise<string>
            }))
            // set erc20 tokens info
            let tokensInfo = allErcTokens.map((token, index) => {
                return {
                    address: token.address,
                    symbol: ercSymbols[index],
                    decimals: ercDecimals[index]
                }
            })
            setTokens(tokensInfo)

            // get unique pairs
            let pairsInfo = infos.map((x, index) => {
                return {
                    collAddress: x[1],
                    collName: tokensInfo.find(y => y.address == x[1])!.symbol,
                    loanAddress: x[0],
                    loanName: tokensInfo.find(y => y.address == x[0])!.symbol,
                }
            }).filter(
                (thing, i, arr) => arr.findIndex(t => t.collAddress + t.loanAddress === thing.collAddress + thing.loanAddress) === i
            );

            setPairs(pairsInfo)
            setCurrentPair(pairsInfo[0])
        }
        fetchPools().catch(err => {
            console.log('Failed to fetch pools: ', err)
        })
    }, [])

    function clickedOnPair(id: number) {
        let pair = pairs[id]
        setCurrentPair(pair)
    }

    // simulate loans on pair/value change
    useEffect(() => {
        updateOnchainData(true)
    }, [currentPair, value]);

    const updateOnchainData = async (shouldSetIsLoading: boolean) => {
        simulateLoans(shouldSetIsLoading).catch(err => {
            console.log('Caught an exception simulating loans:', err)
        })
        updateBalance().catch(err => {
            console.log('Caught an exception updating balances:', err)
        })
    }

    const updateBalance = async () => {
        if (currentPair == undefined) return
        let collToken = tokens.find(x => x.address == currentPair?.collAddress)!
        let contract = getContract({
            address: currentPair.collAddress,
            abi: IErc20Abi,
            publicClient: client
        })
        contract.read.balanceOf([address]).then(balance => {
            balance = balance as number
            setCollBalance((balance as bigint / BigInt(10 ** collToken.decimals)).toString())
        })
        if (selectedLoan != undefined) {
            contract.read.allowance([address, selectedLoan?.pool.address]).then(allowance => {
                let allowance1 = allowance as bigint
                setCollAllowance(allowance1)
            })
        }
    }

    const simulateLoans = async (shouldSetLoading: boolean) => {
        if (currentPair == undefined) return
        let collToken = tokens.find(x => x.address == currentPair!.collAddress)! // we know it exists for sure
        let rawValue = parseUnits(value, collToken.decimals)
        let relatedPools = pools.filter(x => x.info[1] == currentPair!.collAddress
            && x.info[0] == currentPair!.loanAddress)
        if (shouldSetLoading) setIsSimulatingPools(true)
        let simulatedLoans = await Promise.all(relatedPools.map(x => {
            if (x.info[3] > rawValue) {
                // loan too small
                return {
                    error: 'Loan too small',
                    0: ZERO,
                    1: ZERO,
                    2: ZERO,
                    3: ZERO
                }
            }
            let contract = getContract({
                address: x.address,
                abi: IPoolAbi,
                publicClient: client
            })
            return contract.read.loanTerms([rawValue]).then(terms => {
                let newTerms = terms as bigint[]
                return {
                    error: '',
                    0: newTerms[0],
                    1: newTerms[1],
                    2: newTerms[2],
                    3: newTerms[3]
                }
            }).catch(err => {
                return {
                    error: err.error,
                    0: ZERO,
                    1: ZERO,
                    2: ZERO,
                    3: ZERO
                }
            }) as Promise<SimulatedLoan> // in case of a failure, show 0s
        }))
        if (shouldSetLoading) setIsSimulatingPools(false)
        setSimulatedLoans(simulatedLoans.map((loan, index) => {
            return {
                pool: relatedPools[index],
                loan,
                loanToken: tokens.find(y => y.address == relatedPools[index].info[0])!,
                collToken: tokens.find(y => y.address == relatedPools[index].info[1])!,
            }
        }))
    }

    async function onSelectedLoan(pool: PoolAndSimulationResult) {
        setSelectedLoan(pool)
    }

    const {data: dataBorrow, isLoading: isLoadingBorrow, isSuccess: isSuccessBorrow, write: writeBorrow} = useContractWrite({
        abi: IPoolAbi,
        functionName: 'borrow',
        onError: error => {console.log('semikek', error)},
        onSuccess: sentTxResult => {setCurrentTx(sentTxResult.hash)}
    })

    const {data: dataApprove, isLoading: isLoadingApprove, isSuccess: isSuccessApprove, write: writeApprove} = useContractWrite({
        abi: IErc20Abi,
        functionName: 'approve',
        onError: error => {console.log('semikek', error)},
        onSuccess: sentTxResult => {setCurrentTx(sentTxResult.hash)}
    })

    let [currentTx, setCurrentTx] = useState<`0x{string}`| undefined>()
    const {data: dataTxConfirmation, isLoading: isLoadingTxConfirmation} = useWaitForTransaction({hash: currentTx})
    let [isSimulatingPools, setIsSimulatingPools] = useState<boolean>(false)

    async function borrow() {
        let collToken = tokens.find(x => x.address == currentPair?.collAddress)
        let rawValue = parseUnits(value, collToken!.decimals)
        if (collAllowance < rawValue) {
            writeApprove({
                args: [
                    selectedLoan?.pool.address,
                    rawValue
                ],
                // @ts-ignore
                address: selectedLoan?.collToken.address,
            })
        } else {
            writeBorrow({
                args: [
                    address,
                    rawValue,
                    // minLoanLimit: basically slippage
                    // set it to 99%
                    selectedLoan?.loan[0]! * BigInt(99) / BigInt(100),
                    // max repay limit: 1% slippage, so 101
                    selectedLoan?.loan[1]! * BigInt(101) / BigInt(100),
                    // deadline: current ts + 600 (10 mins)
                    Math.floor(Date.now() / 1000) + 600,
                    // referral code
                    0
                ],
                // @ts-ignore
                address: selectedLoan?.pool.address,
            })
        }
    }

    console.log('render')

    return (
        <Container>
            {pairs.length != 0 && <Grid>
                <SetupCol>
                    <Step stepNo={1} title={'Select Borrow Pair'}>
                        <BorrowPairs
                            pairs={pairs}
                            onIdSelect={clickedOnPair}
                            selectedId={pairs.indexOf(currentPair!)}
                        />
                    </Step>
                    <Step stepNo={2} title={'Select Pledge Amount'}>
                        <BorrowPledge
                            value={valueUndebounced}
                            onValueChange={onValueChange}
                            onMax={() => {
                                setValue(collBalance)
                            }}
                            balance={collBalance}
                            currency={currentPair!.collName}
                        />
                    </Step>
                    <Step stepNo={3} title={'Select Loan Option'}>
                        {simulatedLoans != undefined && simulatedLoans?.length != 0 &&
                            <BorrowLoan
                                onSelect={onSelectedLoan}
                                rawData={simulatedLoans}
                            />
                        }
                    </Step>
                </SetupCol>
                <ConfirmCol>
                    {selectedLoan?.loan != undefined &&
                        <Step
                            stepNo={4}
                            title={'Check Details & Confirm'}
                            appendItem={<BorrowSettings/>}
                        >
                            <BorrowConfirm
                                isLoading={isLoadingApprove || isLoadingBorrow || isLoadingTxConfirmation || isSimulatingPools}
                                onconfirmed={borrow}
                                pool={selectedLoan}
                                allowance={collAllowance}
                                inputAmnt={parseUnits(value, selectedLoan.collToken.decimals)}
                            />
                        </Step>}
                </ConfirmCol>
            </Grid>}
        </Container>
    );
}
