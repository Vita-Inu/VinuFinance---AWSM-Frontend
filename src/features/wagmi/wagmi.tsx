import { PropsWithChildren, useEffect, useState } from 'react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import {vinuChain} from "@/const";
import { agreementsConfirmed } from '@/utils';
import {
  getCoinbaseConnector,
  getMetamaskConnector,
  getTrustWalletConnector,
  getWalletConnectConnector,
} from '@/features/walletButtons';

const { publicClient, webSocketPublicClient } = configureChains(
  [vinuChain],
  [publicProvider()], //TODO::Maybe there is access for private provider???
);

export function Wagmi({ children }: PropsWithChildren) {
  //NOTE: This is known Wagmi bug https://github.com/wagmi-dev/wagmi/issues/542
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const config = createConfig({
    autoConnect: agreementsConfirmed(),
    connectors: [getMetamaskConnector(), getWalletConnectConnector(), getCoinbaseConnector(), getTrustWalletConnector()],
    publicClient,
    webSocketPublicClient,
  });

  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
