import NextImage from 'next/image';

import {
  Table,
  Explain,
  Value,
  ValueWithExplain,
  Column,
} from '@/components/table';

import CheckIcon from './assets/check.svg';
import { Box } from './styled';

type Row = {
  active: boolean;
  borrowingPeriod: string;
  loanAmount: ValueWithExplain;
  repaymentAmount: ValueWithExplain;
  termRate: ValueWithExplain;
  ltv: string;
  maxLoan: ValueWithExplain;
};

const COLUMNS: Column<Row>[] = [
  {
    label: '',
    key: 'active',
    render: (row) =>
      row.active && (
        <NextImage width={24} height={24} src={CheckIcon} alt={'check icon'} />
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

const DATA: Row[] = [
  {
    active: true,
    borrowingPeriod: '90 days',
    loanAmount: {
      value: '0 rETH',
      explain: 'Min. Loan: 0.1 rETH',
    },
    repaymentAmount: {
      value: '0 rETH',
      explain: 'Int. Cost: 0 rETH',
    },
    termRate: {
      value: '0%',
      explain: 'APR: 0%',
    },
    ltv: '0%',
    maxLoan: {
      value: '0.011354088 rETH',
      explain: 'Max. LTV: 81.8%',
    },
  },
  {
    active: false,
    borrowingPeriod: '90 days',
    loanAmount: {
      value: '0 rETH',
      explain: 'Min. Loan: 0.1 rETH',
    },
    repaymentAmount: {
      value: '0 rETH',
      explain: 'Int. Cost: 0 rETH',
    },
    termRate: {
      value: '0%',
      explain: 'APR: 0%',
    },
    ltv: '0%',
    maxLoan: {
      value: '0.011354088 rETH',
      explain: 'Max. LTV: 81.8%',
    },
  },
];

export function BorrowLoan() {
  return (
    <Box>
      <Table<Row> columns={COLUMNS} data={DATA} />
    </Box>
  );
}
