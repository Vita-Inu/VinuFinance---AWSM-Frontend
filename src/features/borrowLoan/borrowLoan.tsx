import { useState } from 'react';

import { useWindowResize } from '@/hooks';

import { Box } from './styled';
import { Loan } from './types';
import { DesktopTable, MobileTable } from './components';

const DATA: Loan[] = [
  {
    id: '1',
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
    id: '2',
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
  const [loans, setLoans] = useState<Loan[]>(DATA);

  const onSelect = (loan: Loan) => {
    setLoans((prev) =>
      prev.map((prevLoan) => ({
        ...prevLoan,
        active: prevLoan.id === loan.id,
      })),
    );
  };

  const { isMobileSize } = useWindowResize();

  return (
    <Box>
      {!isMobileSize && <DesktopTable onSelect={onSelect} data={loans} />}
      {isMobileSize && <MobileTable onSelect={onSelect} data={loans} />}
    </Box>
  );
}
