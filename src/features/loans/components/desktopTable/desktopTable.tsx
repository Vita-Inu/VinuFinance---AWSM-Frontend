import {Column, Explain, Table, Value} from '@/components/table';
import {CurrencyBadge} from '@/components/currencyBadge';
import {Button, BUTTON_PRESET} from '@/components/buttons';

import {Loan} from '../../types';
import {VALID_LOADERS} from "next/dist/shared/lib/image-config";

type Props = {
    data: Loan[];
    repay: Function,
    isLoading: boolean,
    currentFilter: string | undefined
};

export function DesktopTable({data, repay, isLoading, currentFilter}: Props) {
    const COLUMNS_OPEN: Column<Loan>[] = [
        {
            label: 'Borrowed Amount',
            key: 'borrowed',
            render: (row) => (
                <>
                    <Value>{row.borrowed.value}</Value>
                    <Explain>{row.borrowed.explain}</Explain>
                </>
            ),
        },
        {
            label: 'Repay Before',
            key: 'repayBefore',
            render: (row) => (
                <>
                    <Value>{row.repayBefore.value}</Value>
                    <Explain>{row.repayBefore.explain}</Explain>
                </>
            ),
        },
        {
            label: 'Repayment Amount',
            key: 'repaymentAmount',
            render: (row) => (
                <>
                    <Value>{row.repaymentAmount.value}</Value>
                    <Explain>{row.repaymentAmount.explain}</Explain>
                </>
            ),
        },
        {
            label: 'Collateral Amount',
            key: 'collateralAmount',
            render: (row) => (
                <>
                    <Value>{row.collateralAmount.value}</Value>
                    <Explain>{row.collateralAmount.explain}</Explain>
                </>
            ),
        },
        {
            label: '',
            key: 'actions',
            render: (row) => (
                <Button loading={isLoading} onClick={() => {
                    repay(row.id, row.pool)
                }} preset={BUTTON_PRESET.PINK}>Repay</Button>
            ),
        },
    ]

    const COLUMNS_PAST: Column<Loan>[] = [
        {
            label: 'Borrowed Amount',
            key: 'borrowed',
            render: (row) => (
                <>
                    <Value>{row.borrowed.value}</Value>
                    <Explain>{row.borrowed.explain}</Explain>
                </>
            ),
        },
        {
            label: 'Repayment Amount',
            key: 'repaymentAmount',
            render: (row) => (
                <>
                    <Value>{row.repaymentAmount.value}</Value>
                    <Explain>{row.repaymentAmount.explain}</Explain>
                </>
            ),
        },
        {
            label: 'Collateral Amount',
            key: 'collateralAmount',
            render: (row) => (
                <>
                    <Value>{row.collateralAmount.value}</Value>
                    <Explain>{row.collateralAmount.explain}</Explain>
                </>
            ),
        },
        {
            label: 'Status',
            key: 'actions',
            render: (row) => (
                <>
                    <Value>{row.wasPaidOff ? 'Paid off' : 'Expired'}</Value>
                </>
            ),
        },
    ]

    const COLUMNS = currentFilter === 'OPEN_LOANS' ? COLUMNS_OPEN : COLUMNS_PAST

    return <Table columns={COLUMNS} data={data}/>
}
