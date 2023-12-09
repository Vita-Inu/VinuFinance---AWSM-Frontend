import { ValueWithExplain } from '@/components/table';

export type Loan = {
  key: string;
  id: string;
  active: boolean;
  borrowingPeriod: string;
  loanAmount: ValueWithExplain;
  repaymentAmount: ValueWithExplain;
  termRate: ValueWithExplain;
  ltv: string;
  maxLoan: ValueWithExplain;
};
