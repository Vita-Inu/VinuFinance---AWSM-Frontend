export const enum ROUTE {
  HOME = '/',
  BORROW = '/borrow',
  LOANS = '/loans',
  LIQUIDITY_PROVIDERS = '/liquidity-providers',
}

export const URLS = [
  {
    url: ROUTE.BORROW,
    label: 'Borrow',
  },
  {
    url: ROUTE.LOANS,
    label: 'Manage Loans',
  },
  {
    url: ROUTE.LIQUIDITY_PROVIDERS,
    label: 'LP',
  },
];
