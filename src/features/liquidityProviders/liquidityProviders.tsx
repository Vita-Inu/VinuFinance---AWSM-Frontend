import {useEffect, useState} from 'react';

import {useWindowResize} from '@/hooks';
import {ListContainer} from '@/features/listContainer';
import {useListFilter} from '@/features/listContainer/hooks';
import {LiquidityPoolModal} from '@/features/modals';
import {NOTIFICATION_TYPE, useNotifications} from '@/features/notifications';

import {DesktopTable, MobileTable} from './components';
import {getPools, Pool} from '@/utils/getPools';
import {
    useAccount,
    useContractWrite,
    useNetwork,
    usePublicClient,
    useWaitForTransaction,
} from 'wagmi';
import {getErc20sFromPools} from '@/utils/getErc20sFromPools';
import {multicall} from '@wagmi/core';
import {CHAIN_INFO, IEmergencyWithdrawalAbi, IErc20Abi, IMultiClaimAbi, IPoolAbi} from '@/const';
import {formatUnits, getContract, parseAbiItem} from 'viem';
import {Loader} from '@/components/loader';
import {getFirstApprovedEscrow} from "@/utils/getApprovedEscrows";
import { getPoolsMonthlyAprs, getTokensPrices } from '@/utils/backendInfo';

export class PoolWithInfo {
    key!: `0x${string}`;
    pool!: Pool;
    loanCurrency!: {
        decimals: number;
        symbol: string;
        balance: number;
    };
    collCurrency!: {
        decimals: number;
        symbol: string;
        balance: number;
    };
    currentMonthlyApr!: number;
    lpInfo!: any[];
}

export class Rewards {
    collRewards!: number;
    loanRewards!: number;
}

enum FILTER {
    ALL_POOLS = 'ALL_POOLS',
    MY_POOLS = 'MY_POOLS'
}

export function LiquidityProviders() {
    const {sendNotification} = useNotifications()

    const [liquidityPoolId, setLiquidityPoolId] = useState<string | null>(null);
    const {address} = useAccount()
    let client = usePublicClient()
    const {chain} = useNetwork()

    const {onFilter, filters, currentFilter} = useListFilter([
        {label: 'All pools', value: FILTER.ALL_POOLS},
        {label: 'My pools', value: FILTER.MY_POOLS},
    ]);

    const [isLoadingFirstTime, setIsLoadingFirstTime] = useState<boolean>(true)

    useEffect(() => {
        loadData().catch(err => {
            console.log('failed to load data:', err)
            sendNotification(NOTIFICATION_TYPE.ERROR, 'Failed to load data')
        }).finally(() => {
            setIsLoadingFirstTime(false)
        })
    }, []);

    const [needsContinuation, setNeedsContinuation] = useState<boolean>(false)
    const [continuationType, setContinuationType] = useState<string>('')
    const [continuationArgs, setContinuationArgs] = useState<any>()
    const [currentlyDelegatingTo, setCurrentlyDelegatingTo] = useState<`0x${string}` | undefined>();
    const [currentPendingTxType, setCurrentPendingTxType] = useState<string | undefined>();
    const [isLoadingDelegateUndelegateButton, setIsLoadingDelegateUndelegateButton] = useState<boolean>(false);
    const [priceMap, setPriceMap] = useState<any>();

    async function loadData() {
        if (!chain) return
        let pools = await getPools(client, chain.id)
        let lpInfos = await multicall({
            contracts: pools.map(x => {
                return {
                    address: x.address,
                    abi: IPoolAbi,
                    functionName: 'getLpInfo',
                    args: [address]
                }
            })
        })
        let aprMap = await getPoolsMonthlyAprs(pools.map(x => x.address))
        let ercs = await getErc20sFromPools(client, chain.id, pools, address!)
        setData(pools.map((x, i) => {
            return {
                key: x.address,
                pool: x,
                currentMonthlyApr: x.address in aprMap ? aprMap[x.address] as number : 0,
                loanCurrency: ercs.get(x.info[0])!,
                collCurrency: ercs.get(x.info[1])!,
                lpInfo: lpInfos[i].result as any[]
            }
        }))
        // load erc prices
        let tokenList = Array.from(ercs.keys()) as `0x${string}`[]
        let localPriceMap = await getTokensPrices(tokenList)
        setPriceMap(localPriceMap)
    }

    //region CONTRACT WRITES
    const {
        data: dataApproveLoanToken,
        isLoading: isLoadingApproveLoanToken,
        isSuccess: isSuccessApproveLoanToken,
        write: writeApproveLoanToken
    } = useContractWrite({
        abi: IErc20Abi,
        functionName: 'approve',
        onSuccess: sentTxResult => {
            setCurrentTx(sentTxResult.hash)
            sendNotification(NOTIFICATION_TYPE.SUCCESS, 'Approval transaction sent successfully')
        }
    })

    const {
        data: dataApproveMulticallClaim,
        isLoading: isLoadingApproveMulticallClaim,
        isSuccess: isSuccessApproveMulticallClaim,
        write: writeApproveMulticallClaim
    } = useContractWrite({
        abi: IPoolAbi,
        functionName: 'setApprovals',
        onSuccess: sentTxResult => {
            setCurrentTx(sentTxResult.hash)
            sendNotification(NOTIFICATION_TYPE.SUCCESS, 'Approval transaction sent successfully')
        }
    })

    const {
        data: dataRepay,
        isLoading: isLoadingRepay,
        isSuccess: isSuccessRepay,
        write: writeRepay
    } = useContractWrite({
        abi: IPoolAbi,
        functionName: 'repay',
        onSuccess: sentTxResult => {
            setCurrentTx(sentTxResult.hash)
            sendNotification(NOTIFICATION_TYPE.SUCCESS, 'Repay transaction sent successfully')
        }
    })

    const {
        data: dataAdd,
        isLoading: isLoadingAdd,
        isSuccess: isSuccessAdd,
        write: writeAdd
    } = useContractWrite({
        abi: IPoolAbi,
        functionName: 'addLiquidity',
        onSuccess: sentTxResult => {
            setCurrentTx(sentTxResult.hash)
            sendNotification(NOTIFICATION_TYPE.SUCCESS, 'Add liquidity transaction sent successfully')
        }
    })

    const {
        data: dataRemove,
        isLoading: isLoadingRemove,
        isSuccess: isSuccessRemove,
        write: writeRemove
    } = useContractWrite({
        abi: IPoolAbi,
        functionName: 'removeLiquidity',
        onSuccess: sentTxResult => {
            setCurrentTx(sentTxResult.hash)
            sendNotification(NOTIFICATION_TYPE.SUCCESS, 'Remove liquidity transaction sent successfully')
        }
    })

    const {
        data: dataClaim,
        isLoading: isLoadingClaim,
        isSuccess: isSuccessClaim,
        write: writeClaim
    } = useContractWrite({
        abi: IMultiClaimAbi,
        functionName: 'claimMultiple',
        onSuccess: sentTxResult => {
            setCurrentTx(sentTxResult.hash)
            sendNotification(NOTIFICATION_TYPE.SUCCESS, 'Claim rewards transaction sent successfully')
        }
    })

    const {
        data: dataDelegate,
        isLoading: isLoadingDelegate,
        isSuccess: isSuccessDelegate,
        write: writeDelegate
    } = useContractWrite({
        abi: IEmergencyWithdrawalAbi,
        functionName: 'approve',
        onSuccess: sentTxResult => {
            setCurrentTx(sentTxResult.hash)
            sendNotification(NOTIFICATION_TYPE.SUCCESS, 'Emergency withdrawal delegation transaction sent successfully')
            setCurrentPendingTxType('delegate')
        }
    })

    const {
        data: dataUndelegate,
        isLoading: isLoadingUndelegate,
        isSuccess: isSuccessUndelegate,
        write: writeUndelegate
    } = useContractWrite({
        abi: IEmergencyWithdrawalAbi,
        functionName: 'unapprove',
        onSuccess: sentTxResult => {
            setCurrentTx(sentTxResult.hash)
            sendNotification(NOTIFICATION_TYPE.SUCCESS, 'Emergency withdrawal undelegation transaction sent successfully')
            setCurrentPendingTxType('undelegate')
        }
    })
    //endregion

    //region DEPOSIT/WITHDRAW/CLAIM/DELEGATE/UNDELEGATE LOGIC HANDLERS
    async function deposit(amount: bigint) {
        let pool = data.find(x => x.key == liquidityPoolId)!;
        let loanToken = getContract({
            // @ts-ignore
            address: pool.pool.info[0],
            abi: IErc20Abi,
            publicClient: client
        })
        let allowance = await loanToken.read.allowance([address, pool.pool.address]) as bigint
        if (allowance < amount) {
            // approve
            writeApproveLoanToken({
                args: [
                    pool.pool.address,
                    amount
                ],
                // @ts-ignore
                address: loanToken.address,
            })
            setNeedsContinuation(true)
            setContinuationArgs({
                args: [address!, amount, parseInt((Date.now() / 1000 + 600).toFixed(0)), 0],
                address: pool.pool.address
            })
            setContinuationType('deposit')
        } else {
            // actually deposit
            await deposit_inner({
                args: [address!, amount, parseInt((Date.now() / 1000 + 600).toFixed(0)), 0],
                address: pool.pool.address
            })
        }
    }

    async function claim(reinvest: boolean) {
        let pool = data.find(x => x.key == liquidityPoolId)!;
        let poolContract = getContract({address: pool.pool.address, abi: IPoolAbi, publicClient: client})
        let isApproved = await poolContract.read.isApproved([address!, CHAIN_INFO[chain!.id].MULTICLAIM, 3])
        let isApproved2 = await poolContract.read.isApproved([address!, CHAIN_INFO[chain!.id].MULTICLAIM, 1])

        let args = {
            args: [pool.pool.address, claimGroups, claimGroups.map(x => reinvest), parseInt((Date.now() / 1000 + 600).toFixed(0))],
            address: CHAIN_INFO[chain!.id].MULTICLAIM,
        }

        if (!(isApproved && isApproved2)) {
            // approve claiming to multicall
            writeApproveMulticallClaim({
                args: [
                    CHAIN_INFO[chain!.id].MULTICLAIM,
                    10
                ],
                // @ts-ignore
                address: pool.pool.address,
            })
            setNeedsContinuation(true)
            setContinuationArgs(args)
            setContinuationType('claim')
        } else {
            claim_inner(args)
        }
    }

    async function withdraw(lpShares: bigint) {
        let pool = data.find(x => x.key == liquidityPoolId)!;
        writeRemove({
            // @ts-ignore
            address: pool.key,
            args: [
                address!,
                lpShares
            ]
        })
    }

    async function undelegate() {
        setIsLoadingDelegateUndelegateButton(true)
        let pool = data.find(x => x.key == liquidityPoolId)!;
        writeUndelegate({
            // @ts-ignore
            address: CHAIN_INFO[chain!.id].EMERGENCY_WITHDRAWAL,
            args: [pool.pool.address, currentlyDelegatingTo]
        })
    }

    async function delegate(delegateTo: `0x${string}`) {
        setIsLoadingDelegateUndelegateButton(true)
        let pool = data.find(x => x.pool.address == liquidityPoolId)!;
        let poolContract = getContract({address: pool.pool.address, abi: IPoolAbi, publicClient: client})
        let isApproved = await poolContract.read.isApproved([delegateTo!, CHAIN_INFO[chain!.id].EMERGENCY_WITHDRAWAL, 2])
        let args = {
            args: [pool.pool.address, delegateTo],
            address: CHAIN_INFO[chain!.id].EMERGENCY_WITHDRAWAL,
        }
        if (!isApproved) {
            // approve REMOVE_LIQUIDITY to emergency withdrawal contract
            writeApproveMulticallClaim({
                args: [
                    CHAIN_INFO[chain!.id].EMERGENCY_WITHDRAWAL,
                    4
                ],
                // @ts-ignore
                address: pool.pool.address,
            })
            setNeedsContinuation(true)
            setContinuationArgs(args)
            setContinuationType('delegate')
        } else {
            delegate_inner(args)
        }
    }

    //endregion

    //region CONTINUATION INNER FUNCTION
    async function deposit_inner(args: any) {
        writeAdd(args)
    }

    async function claim_inner(args: any) {
        writeClaim(args)
    }

    async function delegate_inner(args: any) {
        writeDelegate(args)
    }

    //endregion

    const [data, setData] = useState<PoolWithInfo[]>([])
    const [isLoadingRewards, setIsLoadingRewards] = useState<boolean>(false)
    const [rewards, setRewards] = useState<Rewards>({collRewards: 0, loanRewards: 0})
    const [claimGroups, setClaimGroups] = useState<bigint[][]>([])

    const {isTabletSize} = useWindowResize();

    let [currentTx, setCurrentTx] = useState<`0x${string}`>()

    const {data: currentTxData, isLoading: isLoadingCurrentTx} = useWaitForTransaction({
        hash: currentTx,
        onSuccess: data => {
            let firstCall = loadData()
            if (liquidityPoolId != undefined) {
                firstCall.then(x => loadRewards(liquidityPoolId))
            }
            if (needsContinuation) {
                if (continuationType == 'deposit') {
                    deposit_inner(continuationArgs)
                } else if (continuationType == 'claim') {
                    claim_inner(continuationArgs)
                } else if (continuationType == 'delegate') {
                    delegate_inner(continuationArgs)
                }
                setNeedsContinuation(false)
            }
            if (currentPendingTxType == 'delegate' || currentPendingTxType == 'undelegate') {
                setIsLoadingDelegateUndelegateButton(false)
            }
        },
    })

    const showPoolDetails = (poolId: string) => {
        // load rewards info
        setLiquidityPoolId(poolId)
        // TODO: cancel this Promise on modal close
        loadRewards(poolId)
    };

    // this also loads the escrow ure currently delegating to
    const loadRewards = async (poolId: string) => {
        let pool = data.find(x => x.pool.address == poolId)!;
        setIsLoadingRewards(true)
        if (pool.lpInfo[3].length != 0) {
            // get claims first
            let claimLogs = await client.getLogs({
                event: parseAbiItem('event Claim(address indexed lp, uint256[] loanIdxs, uint256 repayments, uint256 collateral)'),
                fromBlock: 'earliest',
                address: pool.pool.address,
                args: {lp: address!}
            })
            let claimedIds = claimLogs.map(x => x.args.loanIdxs!).reduce((current, next) => {
                return current.concat(next)
            }, [])

            // check if closed modal

            let borrowLogs = await client.getLogs({
                event: parseAbiItem('event Borrow(address indexed borrower,uint256 loanIdx,uint256 collateral,uint256 loanAmount,uint256 repaymentAmount,uint256 totalLpShares,uint256 indexed expiry,uint256 indexed referralCode)'),
                fromBlock: 'earliest',
                address: pool.pool.address
            })
            let repaymentLogs = await client.getLogs({
                event: parseAbiItem('event Repay(address indexed borrower,uint256 loanIdx,uint256 repaymentAmountAfterFees)'),
                fromBlock: 'earliest',
                address: pool.pool.address
            })

            let rn = Date.now() / 1000

            // we got all loans info, now we just select active ones
            let repaidIds = repaymentLogs.map(x => x.args.loanIdx!)

            let groups: bigint[][] = []
            let borders = [pool.lpInfo[0]]
            for (let i = pool.lpInfo[2]; i < pool.lpInfo[4].length; i++) {
                groups.push([])
                borders.push(pool.lpInfo[4][i])
            }
            if (groups.length == 0) {
                borders.push(pool.pool.info[8])
                groups.push([])
            }

            let totalClaimableLoan = BigInt(0)
            let totalClaimableColl = BigInt(0)

            for (let i in borrowLogs) {
                let loan = borrowLogs[i].args
                let wasRepaid = repaidIds.includes(loan.loanIdx!)
                if (!wasRepaid && loan.expiry! > rn) {
                    continue // loan is still active
                }
                if (claimedIds.includes(loan.loanIdx!)) {
                    continue // already claimed
                }
                for (let bucket = 0; bucket < groups.length; bucket++) {
                    let min = borders[bucket]
                    let max = borders[bucket + 1]
                    if (loan.loanIdx! >= min && loan.loanIdx! < max) {
                        // falls into this bucket
                        groups[bucket].push(loan.loanIdx!)
                        let sharesAtLoan = (pool.lpInfo[3] as bigint[])[bucket + (Number(pool.lpInfo[2]))] as bigint

                        // now we know loanId, totalShares during the time of the loan and shares of the user at the time of the loan.
                        // we can calculate user reward
                        if (wasRepaid) {
                            let globalReward = loan.repaymentAmount!
                            let userReward = globalReward * sharesAtLoan / loan.totalLpShares!
                            totalClaimableLoan += userReward
                        } else {
                            // expired
                            let globalReward = loan.collateral!
                            let userReward = globalReward * sharesAtLoan / loan.totalLpShares!
                            totalClaimableColl += userReward
                        }

                        break
                    }
                }
            }

            setRewards({
                collRewards: parseFloat(formatUnits(totalClaimableColl, pool.collCurrency.decimals)),
                loanRewards: parseFloat(formatUnits(totalClaimableLoan, pool.loanCurrency.decimals)),
            })
            setClaimGroups(groups)
        }

        // load addresses that u delegate to
        setCurrentlyDelegatingTo(await getFirstApprovedEscrow(client, chain!.id, address!, pool.key))

        setIsLoadingRewards(false)
    }

    const hidePoolDetails = () => {
        // TODO: cancel the loadRewards future if its not complete
        setLiquidityPoolId(null)
    };

    // disable buttons while waiting for pending txs...
    const shouldDisableButtons = isLoadingCurrentTx || isLoadingAdd || isLoadingRepay || isLoadingRemove || isLoadingApproveMulticallClaim || isLoadingApproveLoanToken || isLoadingClaim;

    if (isLoadingFirstTime) {
        return <Loader/>
    }

    const filteredPools = data.filter((pool) => {
        if (currentFilter === FILTER.ALL_POOLS) return true;

        const sharesOverTime = pool.lpInfo[3] as bigint[];

        if (!sharesOverTime.length) return false

        return sharesOverTime[sharesOverTime.length - 1] > 0
    })

    return (
        <ListContainer filters={filters} onFilter={onFilter}>
            <>
                {!isTabletSize && <DesktopTable priceMap={priceMap} data={filteredPools} onView={showPoolDetails}/>}
                {isTabletSize && <MobileTable priceMap={priceMap} data={filteredPools} onView={showPoolDetails}/>}
                {!!liquidityPoolId && (
                    <LiquidityPoolModal
                        isLoadingRewards={isLoadingRewards}
                        shouldDisableButtons={shouldDisableButtons}
                        rewards={rewards}
                        onClickDeposit={deposit}
                        onClickWithdraw={withdraw}
                        onClickClaim={claim}
                        onClose={hidePoolDetails}
                        pool={data.find(x => x.pool.address == liquidityPoolId)!}
                        onClickDelegate={delegate}
                        onClickUndelegate={undelegate}
                        currentDelegatedAddress={currentlyDelegatingTo}
                        isLoadingDelegateUndelegateButton={isLoadingDelegateUndelegateButton}
                    />
                )}
            </>
        </ListContainer>
    );
}
