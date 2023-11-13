import { v4 as uuidV4 } from 'uuid';

import { CurrencyBadge } from '@/components/currencyBadge';
import { Button, BUTTON_PRESET } from '@/components/buttons';
import {
  Buttons,
  DataCell,
  Explain,
  Grid,
  Label,
  Value,
} from '@/components/grid';

import { LoanProvider } from '../../types';

type Props = { data: LoanProvider[]; onView: (id: string) => void };

export function MobileTable({ data, onView }: Props) {
  const CELLS: DataCell<LoanProvider>[] = [
    {
      render: (row) => (
        <>
          <Label>Loan Currency</Label>
          <CurrencyBadge currency={row.loanCurrency} />
        </>
      ),
    },
    {
      render: (row) => (
        <>
          <Label>Collateral Currency</Label>
          <CurrencyBadge currency={row.collateralCurrency} />
        </>
      ),
    },
    {
      render: (row) => (
        <>
          <Label>Total Liquidity</Label>
          <Value>{row.totalLiquidity.value}</Value>
          <Explain>{row.totalLiquidity.explain}</Explain>
        </>
      ),
    },
    {
      render: (row) => (
        <>
          <Label>Current APR</Label>
          <Value>{row.currentApr.value}</Value>
          <Explain>{row.currentApr.explain}</Explain>
        </>
      ),
    },
    {
      render: (row) => (
        <>
          <Label>Loan Tenor</Label>
          <Value>{row.loanTenor}</Value>
        </>
      ),
    },
    {
      render: (row) => (
        <>
          <Label>Current LTV</Label>
          <Value>{row.currentLtv}</Value>
        </>
      ),
    },
    {
      render: (row) => (
        <>
          <Label>Max. Loan Per Collateral Unit</Label>
          <Value>{row.collateralUnit.value}</Value>
          <Explain>{row.collateralUnit.explain}</Explain>
        </>
      ),
    },
    {
      render: (row) => (
        <>
          <Label>Total Loan Volume</Label>
          <Value>{row.totalLoanVolume.value}</Value>
          <Explain>{row.totalLoanVolume.explain}</Explain>
        </>
      ),
    },
    {
      fullWidth: true,
      render: (row) => (
        <Buttons>
          <Button preset={BUTTON_PRESET.PINK} onClick={() => onView(row.id)}>
            View
          </Button>
        </Buttons>
      ),
    },
  ];

  return (
    <>
      {data.map((item) => (
        <Grid<LoanProvider> key={uuidV4()} data={item} cells={CELLS} />
      ))}
    </>
  );
}
