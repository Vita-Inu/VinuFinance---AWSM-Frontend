import { Column, Explain, Table, Value } from '@/components/table';
import { CurrencyBadge } from '@/components/currencyBadge';
import { Button, BUTTON_PRESET } from '@/components/buttons';

import { Loan } from '../../types';

type Props = {
  data: Loan[];
};

export function DesktopTable({ data }: Props) {
  const COLUMNS: Column<Loan>[] = [
    {
      label: '',
      key: 'loan',
      render: (row) => <CurrencyBadge currency={row.loan} />,
    },
    {
      label: 'Loan ID',
      key: 'loanId',
      render: (row) => <CurrencyBadge currency={row.loanId} />,
    },
    {
      label: 'You Borrowed',
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
      render: () => <Button preset={BUTTON_PRESET.PINK}>Repay</Button>,
    },
  ];

  return <Table columns={COLUMNS} data={data} />;
}
