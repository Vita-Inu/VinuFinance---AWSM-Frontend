import { v4 as uuidV4 } from 'uuid';

import {
  Buttons,
  DataCell,
  Explain,
  Grid,
  Label,
  Value,
} from '@/components/grid';
import { CurrencyBadge } from '@/components/currencyBadge';
import { Button, BUTTON_PRESET } from '@/components/buttons';

import { Loan } from '../../types';

type Props = { data: Loan[] };

const CELLS: DataCell<Loan>[] = [
  {
    render: (row) => (
      <>
        <Label>Loan Currency</Label>
        <CurrencyBadge currency={row.loan} />
      </>
    ),
  },
  {
    render: (row) => (
      <>
        <Label>Collateral Currency</Label>
        <CurrencyBadge currency={row.loanId} />
      </>
    ),
  },
  {
    render: (row) => (
      <>
        <Label>You Borrowed</Label>
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
    render: () => (
      <>
        <Buttons>
          <Button preset={BUTTON_PRESET.PINK}>Repay</Button>
        </Buttons>
      </>
    ),
  },
];

export function MobileTable({ data }: Props) {
  return (
    <>
      {data.map((item) => (
        <Grid<Loan> key={uuidV4()} data={item} cells={CELLS} />
      ))}
    </>
  );
}
