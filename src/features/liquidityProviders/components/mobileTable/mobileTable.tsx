import {v4 as uuidV4} from 'uuid';
const humanizeDuration = require("humanize-duration");

import {CurrencyBadge} from '@/components/currencyBadge';
import {Button, BUTTON_PRESET} from '@/components/buttons';
import {
    Buttons,
    DataCell,
    Explain,
    Grid,
    Label,
    Value,
} from '@/components/grid';

import {LoanProvider} from '../../types';
import {PoolWithInfo} from "@/features/liquidityProviders";
import {formatUnits} from "viem";

type Props = { data: PoolWithInfo[]; onView: (id: string) => void };

export function MobileTable({data, onView}: Props) {
    const CELLS: DataCell<PoolWithInfo>[] = [
        {
            render: (row) => (
                <>
                    <Label>Loan Currency</Label>
                    <CurrencyBadge address={row.pool.info[0]} name={row.loanCurrency.symbol}/>,
                </>
            ),
        },
        {
            render: (row) => (
                <>
                    <Label>Collateral Currency</Label>
                    <CurrencyBadge address={row.pool.info[1]} name={row.collCurrency.symbol} />,
                </>
            ),
        },
        {
            render: (row) => (
                <>
                    <Label>Total Liquidity</Label>
                    <Value>{parseFloat(formatUnits(row.pool.info[5], row.collCurrency.decimals)).toFixed(2)} {row.collCurrency.symbol}</Value>
                    <Explain>$0.0</Explain>
                </>
            ),
        },
        {
            render: (row) => (
                <>
                    <Label>Current APR</Label>
                    <Value>{(1 + (row.currentMonthlyApr * 12).toFixed(2))}%</Value>
                    <Explain>~{(Math.pow(1 + row.currentMonthlyApr, 12) * 100 - 100).toFixed(2)}% APY</Explain>
                </>
            ),
        },
        {
            render: (row) => (
                <>
                    <Label>Loan Tenor</Label>
                    <Value>{humanizeDuration(1000 * parseInt(row.pool.info[4].toString()))}</Value>
                </>
            ),
        },
        {
            render: (row) => (
                <>
                    <Label>Max. Loan Per Collateral Unit</Label>
                    <Value>{formatUnits(row.pool.info[2], row.loanCurrency.decimals)} {row.loanCurrency.symbol}</Value>
                    <Explain>$0.0</Explain>
                </>
            ),
        },
        {
            fullWidth: true,
            render: (row) => (
                <Buttons>
                    <Button preset={BUTTON_PRESET.PINK} onClick={() => onView(row.pool.address)}>
                        View
                    </Button>
                </Buttons>
            ),
        },
    ];

    return (
        <>
            {data.map((item) => (
                <Grid<PoolWithInfo> key={uuidV4()} data={item} cells={CELLS}/>
            ))}
        </>
    );
}
