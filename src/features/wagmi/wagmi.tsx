import { PropsWithChildren } from 'react';
import { configureChains, createConfig, WagmiConfig, mainnet } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
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
