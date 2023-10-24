import { v4 as uuidV4 } from 'uuid';

import {
  Grid,
  DataCell,
  Value,
  Explain,
  Label,
  Buttons,
} from '@/components/grid';

import { Button } from '../button';
import { Loan } from '../../types';

type Props = {
  data: Loan[];
  onSelect: (loan: Loan) => void;
};

export function MobileTable({ data, onSelect }: Props) {
  const CELLS: DataCell<Loan>[] = [
    {
      render: (data) => (
        <>
          <Label>Borrowing Period</Label>
          <Value>{data.borrowingPeriod}</Value>
        </>
      ),
    },
    {
      render: (data) => (
        <>
          <Label>Term Rate</Label>
          <Value>{data.termRate.value}</Value>
          <Explain>{data.termRate.explain}</Explain>
        </>
      ),
    },
    {
      render: (data) => (
        <>
          <Label>Loan Amount</Label>
          <Value>{data.loanAmount.value}</Value>
          <Explain>{data.loanAmount.explain}</Explain>
        </>
      ),
    },
    {
      render: (data) => (
        <>
          <Label>LTV</Label>
          <Value>{data.ltv}</Value>
        </>
      ),
    },
    {
      render: (data) => (
        <>
          <Label>Repayment Amount</Label>
          <Value>{data.repaymentAmount.value}</Value>
          <Explain>{data.repaymentAmount.explain}</Explain>
        </>
      ),
    },
    {
      render: (data) => (
        <>
          <Label>Max. Loan Per Coll Unit</Label>
          <Value>{data.maxLoan.value}</Value>
          <Explain>{data.maxLoan.explain}</Explain>
        </>
      ),
    },
    {
      render: (data) => (
        <>
          <Buttons>
            <Button onClick={() => onSelect(data)} active={data.active}>
              {data.active ? 'Selected' : 'Select'}
            </Button>
          </Buttons>
        </>
      ),
    },
  ];

  return (
    <>
      {data.map((item) => {
        return <Grid<Loan> key={uuidV4()} data={item} cells={CELLS} />;
      })}
    </>
  );
}
