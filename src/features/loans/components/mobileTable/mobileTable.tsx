import {v4 as uuidV4} from 'uuid';

import {
    Buttons,
    DataCell,
    Explain,
    Grid,
    Label,
    Value,
} from '@/components/grid';
import {CurrencyBadge} from '@/components/currencyBadge';
import {Button, BUTTON_PRESET} from '@/components/buttons';

import {Loan} from '../../types';

type Props = {
    data: Loan[],
    repay: Function,
    isLoading: boolean,
    currentFilter: string | undefined
};

export function MobileTable({data, repay, isLoading, currentFilter}: Props) {
    const CELLS_OPEN: DataCell<Loan>[] = [
        // todo optionally: render pair bubbles too
        {
            render: (row) => (
                <>
                    <Label>Borrowed Amount</Label>
                    <Value>{row.borrowed.value}</Value>
                    <Explain>{row.borrowed.explain}</Explain>
                </>
            ),
        },
        {
            render: (row) => (
                <>
                    <Label>Repay Before</Label>
                    <Value>{row.repayBefore.value}</Value>
                    <Explain>{row.repayBefore.explain}</Explain>
                </>
            ),
        },
        {
            render: (row) => (
                <>
                    <Label>Repayment Amount</Label>
                    <Value>{row.repaymentAmount.value}</Value>
                    <Explain>{row.repaymentAmount.explain}</Explain>
                </>
            ),
        },
        {
            render: (row) => (
                <>
                    <Label>Collateral Amount</Label>
                    <Value>{row.collateralAmount.value}</Value>
                    <Explain>{row.collateralAmount.explain}</Explain>
                </>
            ),
        },
        {
            fullWidth: true,
            render: (row) => (
                <>
                    <Button loading={isLoading} onClick={() => {
                        repay(row.id, row.pool)
                    }} preset={BUTTON_PRESET.PINK}>Repay</Button>
                </>
            ),
        },
    ];

    const CELLS_PAST: DataCell<Loan>[] = [
        // todo optionally: render pair bubbles too
        {
            render: (row) => (
                <>
                    <Label>Borrowed Amount</Label>
                    <Value>{row.borrowed.value}</Value>
                    <Explain>{row.borrowed.explain}</Explain>
                </>
            ),
        },
        {
            render: (row) => (
                <>
                    <Label>Repayment Amount</Label>
                    <Value>{row.repaymentAmount.value}</Value>
                    <Explain>{row.repaymentAmount.explain}</Explain>
                </>
            ),
        },
        {
            render: (row) => (
                <>
                    <Label>Collateral Amount</Label>
                    <Value>{row.collateralAmount.value}</Value>
                    <Explain>{row.collateralAmount.explain}</Explain>
                </>
            ),
        },
        {
            render: (row) => (
                <>
                    <Label>Status</Label>
                    <Value>{row.wasPaidOff ? 'Paid off' : 'Expired'}</Value>
                </>
            ),
        },
    ];

    const CELLS = currentFilter === 'OPEN_LOANS' ? CELLS_OPEN : CELLS_PAST

    return (
        <>
            {data.map((item) => (
                <Grid<Loan> key={uuidV4()} data={item} cells={CELLS}/>
            ))}
        </>
    );
}
