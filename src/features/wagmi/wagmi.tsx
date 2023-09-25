import { PropsWithChildren } from 'react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import { vinuTestnet } from './chains';

const { publicClient, webSocketPublicClient } = configureChains(
  [vinuTestnet],
  [publicProvider()], //TODO::Maybe there is access for private provider???
);

const config = createConfig({
  autoConnect: false,
  publicClient,
  webSocketPublicClient,
});

export function Wagmi({ children }: PropsWithChildren) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
