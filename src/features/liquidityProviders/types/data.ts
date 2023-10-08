import { CURRENCY } from '@/utils/currency';
import { ValueWithExplain } from '@/components/table';

export type LoanProvider = {
  loanCurrency: CURRENCY;
  collateralCurrency: CURRENCY;
  totalLiquidity: ValueWithExplain;
  currentApr: ValueWithExplain;
  loanTenor: string;
  currentLtv: string;
  collateralUnit: ValueWithExplain;
  totalLoanVolume: ValueWithExplain;
};
