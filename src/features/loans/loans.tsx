import { useState } from 'react';

import { Container } from '@/components/container';
import { Column, Explain, Table, Value } from '@/components/table';
import { Button, BUTTON_PRESET } from '@/components/buttons';
import { CurrencyBadge } from '@/components/currencyBadge';

import { useLoans } from './hooks';
import { Filter, Filters, List, Wrapper } from './components';
import { Loan } from './types';

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

export function Loans() {
  const [filterKey, setFilterKey] = useState<string>();

  const { data } = useLoans(filterKey);

  return (
    <Container>
      <Wrapper>
        <Filters>
          <Filter
            $active={!filterKey}
            role={'button'}
            onClick={() => setFilterKey(undefined)}
          >
            Open loans
          </Filter>
          <Filter
            $active={filterKey === 'CLOSED'}
            role={'button'}
            onClick={() => setFilterKey('CLOSED')}
          >
            Past loans
          </Filter>
        </Filters>
        <List>
          <Table columns={COLUMNS} data={data} />
        </List>
      </Wrapper>
    </Container>
  );
}
