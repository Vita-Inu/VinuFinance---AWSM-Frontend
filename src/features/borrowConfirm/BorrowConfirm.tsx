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
    collPrice: number;
    loanPrice: number;
}

export function BorrowConfirm({pool, inputAmnt, onconfirmed, isLoading, allowance, collPrice, loanPrice}: Props) {
    let collateralAmnt = parseFloat(formatUnits(BigInt(inputAmnt.toString()), pool.collToken.decimals))
    let borrowAmnt = parseFloat(formatUnits(BigInt(pool.loan[0].toString()), pool.loanToken.decimals))
    let data = [
        {
            label: 'You Send',
            value: parseFloat(collateralAmnt.toFixed(3)).toLocaleString('en-US') + ' ' + pool.collToken.symbol,
            explain: `($${parseFloat((collPrice * collateralAmnt).toFixed(2)).toLocaleString('en-US')})`,
            dateTime: null,
        },
        {
            label: 'You Borrow',
            value: parseFloat(borrowAmnt.toFixed(3)).toLocaleString('en-US') + ' ' + pool.loanToken.symbol,
            explain: `($${parseFloat((borrowAmnt * loanPrice).toFixed(2)).toLocaleString('en-US')})`,
            dateTime: null,
        },
        {
            label: 'Repayment Amount',
            value: parseFloat(parseFloat(formatUnits(BigInt(pool.loan[1].toString()), pool.loanToken.decimals)).toFixed(3)).toLocaleString('en-US') + ' ' + pool.loanToken.symbol,
            explain: `($${parseFloat((loanPrice * parseFloat(formatUnits(BigInt(pool.loan[1].toString()), pool.loanToken.decimals))).toFixed(2)).toLocaleString('en-US')})`,
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
            value: parseFloat(parseFloat(formatUnits(BigInt(pool.loan[2].toString()), pool.collToken.decimals)).toFixed(3)).toLocaleString('en-US') + ' ' + pool.collToken.symbol,
            explain: `($${parseFloat((collPrice * parseFloat(formatUnits(BigInt(pool.loan[2].toString()), pool.collToken.decimals))).toFixed(2)).toLocaleString('en-US')})`,
            dateTime: null,
        },
        {
            label: 'Total Fees',
            value: parseFloat(parseFloat(formatUnits(BigInt(pool.loan[3].toString()), pool.collToken.decimals)).toFixed(3)).toLocaleString('en-US')+ ' ' + pool.collToken.symbol,
            explain: `${parseFloat((parseFloat(formatUnits(BigInt(pool.loan[3].toString()), pool.collToken.decimals)) / collateralAmnt * 100).toFixed(2)).toLocaleString('en-US')}%`,
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
