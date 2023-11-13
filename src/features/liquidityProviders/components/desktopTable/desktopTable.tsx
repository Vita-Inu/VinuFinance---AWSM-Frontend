import { Column, Explain, Table, Value } from '@/components/table';
import { LoanProvider } from '@/features/liquidityProviders/types';
import { CurrencyBadge } from '@/components/currencyBadge';
import { Button, BUTTON_PRESET } from '@/components/buttons';

type Props = { data: LoanProvider[]; onView: (id: string) => void };

export function DesktopTable({ data, onView }: Props) {
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
      render: (row) => (
        <Button preset={BUTTON_PRESET.PINK} onClick={() => onView(row.id)}>
          View
        </Button>
      ),
    },
  ];

  return <Table columns={COLUMNS} data={data} />;
}
