import {useEffect, useState} from 'react';

import {useWindowResize} from '@/hooks';

import {Box} from './styled';
import {Loan} from './types';
import {DesktopTable, MobileTable} from './components';
import {PoolAndSimulationResult} from "@/features/borrow";
import {formatUnits} from "viem";
const humanizeDuration = require("humanize-duration");

const DATA: Loan[] = [
    {
        id: '1',
        active: true,
        borrowingPeriod: '90 days',
        loanAmount: {
            value: '0 rETH',
            explain: 'Min. Loan: 0.1 rETH',
        },
        repaymentAmount: {
            value: '0 rETH',
            explain: 'Int. Cost: 0 rETH',
        },
        termRate: {
            value: '0%',
            explain: 'APR: 0%',
        },
        ltv: '0%',
        maxLoan: {
            value: '0.011354088 rETH',
            explain: 'Max. LTV: 81.8%',
        },
    },
];

type Props = {
    rawData: PoolAndSimulationResult[];
    onSelect: Function;
}

export function BorrowLoan({rawData, onSelect: onSelectHigher}: Props) {
    const [loans, setLoans] = useState<Loan[]>([]);
    useEffect(() => {
        let newLoans = rawData.map((x, idx) => {
            return {
                id: idx.toString(),
                active: idx == 0,
                borrowingPeriod: humanizeDuration(1000 * parseInt(x.pool.info[4].toString())),
                loanAmount: {
                    value: parseFloat(formatUnits(BigInt(x.loan[0].toString()), x.loanToken.decimals)).toFixed(3) + ' ' + x.loanToken.symbol,
                    explain: ''
                },
                repaymentAmount: {
                    value: parseFloat(formatUnits(BigInt(x.loan[1].toString()), x.loanToken.decimals)).toFixed(3) + ' ' + x.loanToken.symbol,
                    explain: ''
                },
                termRate: {
                    value: '0%',
                    explain: ''
                },
                ltv: '0%',
                maxLoan: {
                    value: parseFloat(formatUnits(BigInt(x.pool.info[2].toString()), x.loanToken.decimals)).toFixed(2) + ' ' + x.loanToken.symbol,
                    explain: ''
                }
            }
        })
        setLoans(newLoans)
        if (newLoans.length >= 1) onSelectHigher(rawData[0])
    }, [rawData])

    const onSelect = (loan: Loan) => {
        setLoans((prev) =>
            prev.map((prevLoan) => ({
                ...prevLoan,
                active: prevLoan.id === loan.id,
            })),
        );
        // @ts-ignore
        onSelectHigher(rawData[loan.id])
    };

    const {isMobileSize} = useWindowResize();

    return (
        <Box>
            {!isMobileSize && <DesktopTable onSelect={onSelect} data={loans}/>}
            {isMobileSize && <MobileTable onSelect={onSelect} data={loans}/>}
        </Box>
    );
}
