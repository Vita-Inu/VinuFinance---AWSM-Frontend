import { useState } from 'react';

import { Container } from '@/components/container';
import { Column, Explain, Table, Value } from '@/components/table';
import { Button, BUTTON_PRESET } from '@/components/buttons';
import { CurrencyBadge } from '@/components/currencyBadge';

import { usePools } from './hooks';
import { Filter, Filters, List, Wrapper } from './components';
import { LoanProvider } from './types';

const COLUMNS: Column<LoanProvider>[] = [
  {
    label: 'Loan Currency',
    key: 'loanCurrency',
    render: (row) => <CurrencyBadge currency={row.loanCurrency} />,
  },
  {
    label: 'Collateral Currency',
    key: 'collateralCurrency',
    render: (row) => <CurrencyBadge currency={row.collateralCurrency} />,
  },
  {
    label: 'Total Liquidity',
    key: 'totalLiquidity',
    render: (row) => (
      <>
        <Value>{row.totalLiquidity.value}</Value>
        <Explain>{row.totalLiquidity.value}</Explain>
      </>
    ),
  },
  {
    label: 'Current APR',
    key: 'currentApr',
    render: (row) => (
      <>
        <Value>{row.currentApr.value}</Value>
        <Explain>{row.currentApr.value}</Explain>
      </>
    ),
  },
  {
    label: 'Loan Tenor',
    key: 'loanTenor',
  },
  {
    label: 'Current LTV',
    key: 'currentLtv',
  },
  {
    label: 'Max. Loan Per Collateral Unit',
    key: 'collateralUnit',
    render: (row) => (
      <>
        <Value>{row.collateralUnit.value}</Value>
        <Explain>{row.collateralUnit.value}</Explain>
      </>
    ),
  },
  {
    label: 'Total Loan Volume',
    key: 'totalLoanVolume',
    render: (row) => (
      <>
        <Value>{row.totalLoanVolume.value}</Value>
        <Explain>{row.totalLoanVolume.value}</Explain>
      </>
    ),
  },
  {
    label: '',
    key: 'actions',
    render: () => <Button preset={BUTTON_PRESET.PINK}>View</Button>,
  },
];

export function LiquidityProviders() {
  const [filterKey, setFilterKey] = useState<string>();

  const { data } = usePools(filterKey);

  return (
    <Container>
      <Wrapper>
        <Filters>
          <Filter
            $active={!filterKey}
            role={'button'}
            onClick={() => setFilterKey(undefined)}
          >
            All pools
          </Filter>
          <Filter
            $active={filterKey === 'CREATED'}
            role={'button'}
            onClick={() => setFilterKey('CREATED')}
          >
            My pools
          </Filter>
        </Filters>
        <List>
          <Table columns={COLUMNS} data={data} />
        </List>
      </Wrapper>
    </Container>
  );
}
