import NextImage from 'next/image';

import { Column, Explain, Table, Value } from '@/components/table';

import { Loan } from '../../types';

import { CheckBox } from './styled';
import CheckIcon from './assets/check.svg';

const COLUMNS: Column<Loan>[] = [
  {
    label: '',
    key: 'active',
    render: (row, state) => (
      <CheckBox $hovered={state.hovered} $active={row.active}>
        <NextImage width={24} height={24} src={CheckIcon} alt={'check icon'} />
      </CheckBox>
    ),
  },
  {
    label: 'Borrowing Period',
    key: 'borrowingPeriod',
  },
  {
    label: 'Loan Amount',
    key: 'loanAmount',
    render: (row) => (
      <>
        <Value>{row.loanAmount.value}</Value>
        <Explain>{row.loanAmount.explain}</Explain>
      </>
    ),
  },
  {
    label: 'Repayment amount',
    key: 'repaymentAmount',
    render: (row) => (
      <>
        <Value>{row.repaymentAmount.value}</Value>
        <Explain>{row.repaymentAmount.explain}</Explain>
      </>
    ),
  },
  {
    label: 'Term Rate',
    key: 'termRate',
    render: (row) => (
      <>
        <Value>{row.termRate.value}</Value>
        <Explain>{row.termRate.explain}</Explain>
      </>
    ),
  },
  {
    label: 'LTV',
    key: 'ltv',
  },
  {
    label: 'Max. Loan Per Coll Unit',
    key: 'maxLoan',
    render: (row) => (
      <>
        <Value>{row.maxLoan.value}</Value>
        <Explain>{row.maxLoan.explain}</Explain>
      </>
    ),
  },
];

type Props = {
  data: Loan[];
  onSelect: (loan: Loan) => void;
};

export function DesktopTable({ data, onSelect }: Props) {
  return <Table<Loan> columns={COLUMNS} data={data} onRowClick={onSelect} />;
}
