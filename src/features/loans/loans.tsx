import {useWindowResize} from '@/hooks';
import {ListContainer, useListFilter} from '@/features/listContainer';

import {useLoans} from './hooks';
import {DesktopTable, MobileTable} from './components';
import {useAccount, useNetwork, usePublicClient} from "wagmi";
import {useEffect} from "react";
import {formatUnits, parseAbiItem} from "viem";
import {getPools} from "@/utils/getPools";
import {getErc20sFromPools} from "@/utils/getErc20sFromPools";

export function Loans() {
    const {address} = useAccount()
    let client = usePublicClient()
    const {chain} = useNetwork()

    useEffect(() => {
        if (!chain) return
        // fetch loans by address
        const loadLoans = async () => {
            let pools = await getPools(client, chain.id)
            let tokens = await getErc20sFromPools(client, chain.id, pools)
            console.log(tokens)

            let borrowLogs = await client.getLogs({
                event: parseAbiItem('event Borrow(address indexed borrower,uint256 loanIdx,uint256 collateral,uint256 loanAmount,uint256 repaymentAmount,uint256 totalLpShares,uint256 indexed expiry,uint256 indexed referralCode)'),
                fromBlock: 'earliest',
                args: {
                    borrower: address
                },
                address: pools.map(x => x.address)
            })
            let repaymentLogs = await client.getLogs({
                event: parseAbiItem('event Repay(address indexed borrower,uint256 loanIdx,uint256 repaymentAmountAfterFees)'),
                fromBlock: 'earliest',
                args: {
                    borrower: address
                },
                address: pools.map(x => x.address)
            })

            let rn = Date.now() / 1000

            // we got all loans info, now we just select active ones
            let repaidIds = repaymentLogs.map(x => x.args.loanIdx!)

            let activeLoans = borrowLogs.filter(x => x.args.expiry! > rn).filter(x => !repaidIds.includes(x.args.loanIdx!))
            let activeIds = activeLoans.map(x => x.args.loanIdx)
            // past loans are the ones that are not active :yum:
            let pastLoans = borrowLogs.filter(x => !activeIds.includes(x.args.loanIdx))

            let finalActiveLoans = activeLoans.map(x => {
                let pool = pools.find(pool => pool.address == x.address)!
                let loanToken = tokens.get(pool.info[0])!
                let collToken = tokens.get(pool.info[1])!
                return {
                    id: x.args.loanIdx,
                    borrowed: formatUnits(x.args.loanAmount!, loanToken.decimals),
                    repayment: formatUnits(x.args.repaymentAmount!, loanToken.decimals),
                    pledge: formatUnits(x.args.collateral!, collToken.decimals),
                    collToken,
                    loanToken
                }
            }).reverse()

            let finalPastLoans = pastLoans.map(x => {
                let pool = pools.find(pool => pool.address == x.address)!
                let loanToken = tokens.get(pool.info[0])!
                let collToken = tokens.get(pool.info[1])!
                return {
                    id: x.args.loanIdx,
                    borrowed: formatUnits(x.args.loanAmount!, loanToken.decimals),
                    repayment: formatUnits(x.args.repaymentAmount!, loanToken.decimals),
                    pledge: formatUnits(x.args.collateral!, collToken.decimals),
                    collToken,
                    loanToken,
                    repaid: repaidIds.includes(x.args.loanIdx!)
                }
            }).reverse()
            console.log(finalActiveLoans)
            console.log(finalPastLoans)
        }

        loadLoans().catch(err => {
            console.log('Failed to fetch loans:', err)
        })
    }, [address]);

    const {onFilter, filters, currentFilter} = useListFilter([
        {label: 'Open loans', value: 'OPEN_LOANS'},
        {label: 'Past loans', value: 'PAST_LOANS'},
    ]);

    const {data} = useLoans(currentFilter);

    const {isTabletSize} = useWindowResize();


    return (
        <ListContainer filters={filters} onFilter={onFilter}>
            <>
                {!isTabletSize && <DesktopTable data={data}/>}
                {isTabletSize && <MobileTable data={data}/>}
            </>
        </ListContainer>
    );
}
