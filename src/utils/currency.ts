import PlaceholderIcon from '@/assets/currency-placeholder.svg';

export const enum CURRENCY {
  ETH = 'ETH',
  RETH = 'RETH',
  RPL = 'RPL',
}

export const CurrencyMap = new Map<CURRENCY, { title: string; img: string }>([
  [CURRENCY.ETH, { img: PlaceholderIcon, title: 'ETH' }],
  [CURRENCY.RETH, { img: PlaceholderIcon, title: 'rETH' }],
  [CURRENCY.RPL, { img: PlaceholderIcon, title: 'RPL' }],
]);
