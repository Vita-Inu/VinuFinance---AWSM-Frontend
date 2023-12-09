import { ValueWithExplain } from '@/components/table';

export type Loan = {
  id: bigint;
  key: string;
  uniqueId: string;
  collateralTokenAddress: `0x{string}`;
  collateralTokenName: string;
  loanTokenAddress: `0x{string}`;
  loanTokenName: string;
  pool: `0x{string}`
  borrowed: ValueWithExplain;
  repayBefore: ValueWithExplain;
  repaymentAmount: ValueWithExplain;
  repaymentAmountRaw?: bigint;
  collateralAmount: ValueWithExplain;
  wasPaidOff: boolean; // if false it expired
};
