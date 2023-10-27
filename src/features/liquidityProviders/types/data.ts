import { CURRENCY } from '@/utils/currency';
import { ValueWithExplain } from '@/components/table';

export type LoanProvider = {
  id: string;
  loanCurrency: CURRENCY;
  collateralCurrency: CURRENCY;
  totalLiquidity: ValueWithExplain;
  currentApr: ValueWithExplain;
  loanTenor: string;
  currentLtv: string;
  collateralUnit: ValueWithExplain;
  totalLoanVolume: ValueWithExplain;
};
