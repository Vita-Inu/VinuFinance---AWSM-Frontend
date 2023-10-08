import { LoanProvider } from '@/features/liquidityProviders/types';
import { CURRENCY } from '@/utils/currency';

const FAKE_ROW: LoanProvider = {
  loanCurrency: CURRENCY.RETH,
  collateralCurrency: CURRENCY.RPL,
  totalLiquidity: {
    value: '0.11128082 rETH',
    explain: '($220.16)',
  },
  currentApr: {
    value: '0.4009%',
    explain: 'Floored at 0.04%',
  },
  loanTenor: '90 days',
  currentLtv: '81.8%',
  collateralUnit: {
    value: '0.011354088 rETH',
    explain: '($22.46)',
  },
  totalLoanVolume: {
    value: '138.62201 rETH',
    explain: '($274,253.96)',
  },
};

export const usePools = (filter?: string) => {
  const data: LoanProvider[] =
    filter === 'CREATED' ? [FAKE_ROW] : Array(9).fill(FAKE_ROW);

  return { data };
};
