import {ChangeEvent, useEffect, useRef, useState} from 'react';

import {Container} from '@/components/container';
import {Loader} from '@/components/loader';
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
import {getPools, Pool} from "@/utils/getPools";
import {getErc20sFromPools, Tokens} from "@/utils/getErc20sFromPools";

//region STRUCTS
export type PairType = {
    collAddress: `0x{string}`;
    collName: string;
    loanAddress: `0x{string}`;
    loanName: string;
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
    loanToken: {
        address: `0x{string}`;
        decimals: number;
        symbol: string;
    };
    collToken: {
        address: `0x{string}`;
        decimals: number;
        symbol: string
    };
}
//endregion

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
    let [tokens, setTokens] = useState<Tokens>()
    let [pairs, setPairs] = useState<PairType[]>([])
    let [currentPair, setCurrentPair] = useState<PairType>()
    let pairRef = useRef<PairType>()
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

            let pools = await getPools(client, chain.id)
            setPools(pools)

            let tokens = await getErc20sFromPools(client, chain.id, pools, address!)
            setTokens(tokens)

            // get unique pairs
            let pairsInfo = pools.map((x, index) => {
                return {
                    collAddress: x.info[1],
                    collName: tokens.get(x.info[1])!.symbol,
                    loanAddress: x.info[0],
                    loanName: tokens.get(x.info[0])!.symbol,
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
        if (tokens == undefined) return
        let collToken = tokens.get(currentPair.collAddress)!
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
        if (tokens == undefined) return
        let collToken = tokens.get(currentPair.collAddress)!
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
            let loanToken = {
                ...tokens!.get(relatedPools[index].info[0])!,
                address: relatedPools[index].info[0]
            }
            let collToken = {
                ...tokens!.get(relatedPools[index].info[1])!,
                address: relatedPools[index].info[1]
            }
            return {
                pool: relatedPools[index],
                loan,
                loanToken,
                collToken
            }
        }))
    }

    async function onSelectedLoan(pool: PoolAndSimulationResult) {
        setSelectedLoan(pool)
    }

    //region CONTRACT WRITES
    const {
        data: dataBorrow,
        isLoading: isLoadingBorrow,
        isSuccess: isSuccessBorrow,
        write: writeBorrow
    } = useContractWrite({
        abi: IPoolAbi,
        functionName: 'borrow',
        onSuccess: sentTxResult => {
            setCurrentTx(sentTxResult.hash)
        }
    })

    const {
        data: dataApprove,
        isLoading: isLoadingApprove,
        isSuccess: isSuccessApprove,
        write: writeApprove
    } = useContractWrite({
        abi: IErc20Abi,
        functionName: 'approve',
        onSuccess: sentTxResult => {
            setCurrentTx(sentTxResult.hash)
        }
    })
    //endregion

    let [currentTx, setCurrentTx] = useState<`0x${string}`>()
    const {data: dataTxConfirmation, isLoading: isLoadingTxConfirmation} = useWaitForTransaction({hash: currentTx})
    let [isSimulatingPools, setIsSimulatingPools] = useState<boolean>(false)

    async function borrow() {
        if (tokens == undefined) return
        if (currentPair == undefined) return
        let collToken = tokens.get(currentPair.collAddress)
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
            {pairs.length == 0 && <Loader/>}
        </Container>
    );
}
