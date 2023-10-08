export const enum CURRENCY {
  ETH = 'ETH',
  RETH = 'RETH',
  RPL = 'RPL',
}

export const CurrencyMap = new Map<CURRENCY, { title: string; img: string }>([
  [CURRENCY.ETH, { img: '/currency/placeholder.svg', title: 'ETH' }],
  [CURRENCY.RETH, { img: '/currency/placeholder.svg', title: 'rETH' }],
  [CURRENCY.RPL, { img: '/currency/placeholder.svg', title: 'RPL' }],
]);
