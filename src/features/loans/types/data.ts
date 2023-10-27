import { CURRENCY } from '@/utils/currency';
import { ValueWithExplain } from '@/components/table';

export type Loan = {
  id: string;
  loan: CURRENCY;
  loanId: CURRENCY;
  borrowed: ValueWithExplain;
  repayBefore: ValueWithExplain;
  repaymentAmount: ValueWithExplain;
  collateralAmount: ValueWithExplain;
};
