import {Box, Rows, Referral, Button, Row} from './components';
import {PoolAndSimulationResult} from "@/features/borrow";
import {useEffect, useState} from "react";
import {formatUnits} from "viem";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

type Props = {
    inputAmnt: bigint;
    pool: PoolAndSimulationResult;
    onconfirmed: VoidFunction;
    isLoading: boolean;
    allowance: bigint;
}

export function BorrowConfirm({pool, inputAmnt, onconfirmed, isLoading, allowance}: Props) {
    let collateralAmnt = parseFloat(formatUnits(BigInt(inputAmnt.toString()), pool.collToken.decimals))
    let borrowAmnt = parseFloat(formatUnits(BigInt(pool.loan[0].toString()), pool.loanToken.decimals))
    let data = [
        {
            label: 'You Send',
            value: collateralAmnt.toFixed(3) + ' ' + pool.collToken.symbol,
            explain: '($0.00)',
            dateTime: null,
        },
        {
            label: 'You Borrow',
            value: borrowAmnt.toFixed(3) + ' ' + pool.loanToken.symbol,
            explain: '($0.00)',
            dateTime: null,
        },
        {
            label: 'Repayment Amount',
            value: parseFloat(formatUnits(BigInt(pool.loan[1].toString()), pool.loanToken.decimals)).toFixed(3) + ' ' + pool.loanToken.symbol,
            explain: '($0.00)',
            dateTime: null,
        },
        {
            label: 'Due Date',
            value: '',
            explain: '',
            dateTime: new Date(Date.now() + parseInt(pool.pool.info[4].toString()) * 1000)
        },
        {
            label: 'Reclaimable Amount',
            value: parseFloat(formatUnits(BigInt(pool.loan[2].toString()), pool.collToken.decimals)).toFixed(3) + ' ' + pool.collToken.symbol,
            explain: '($0.00)',
            dateTime: null,
        },
        {
            label: 'Total Fees',
            value: parseFloat(formatUnits(BigInt(pool.loan[3].toString()), pool.collToken.decimals)).toFixed(3) + ' ' + pool.collToken.symbol,
            explain: '0 %',
            dateTime: null,
        },
    ]

    return (
        <Box>
            <Rows>
                {data.map(({explain, label, value, dateTime}, index) => (
                    <Row
                        key={index}
                        label={label}
                        value={value}
                        explain={explain}
                        dateTime={dateTime}
                    />
                ))}
            </Rows>
            <Button
                needsApproval={allowance < inputAmnt}
                loading={isLoading}
                enabled={pool.loan.error == ''}
                borrowedAmnt={borrowAmnt}
                collateralAmnt={collateralAmnt}
                borrowedToken={pool.loanToken.symbol}
                collateralToken={pool.collToken.symbol}
                error={pool.loan.error}
                onclick={onconfirmed}
            />
        </Box>
    );
}
