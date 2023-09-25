import type { Chain } from 'wagmi';

export const vinuTestnet = {
  id: 27,
  name: 'Vinu Testnet',
  network: 'vinu-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'VinuCoin',
    symbol: 'VC',
  },
  rpcUrls: {
    public: { http: ['https://vinuchain-rpc.com/'] },
    default: { http: ['https://vinuchain-rpc.com/'] },
  },
  blockExplorers: {
    etherscan: { name: 'VinuScan', url: 'https://vinuscan.com/' },
    default: { name: 'VinuScan', url: 'https://vinuscan.com/' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 8328688,
    },
  },
} as const satisfies Chain;
