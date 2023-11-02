import { PropsWithChildren, useEffect, useState } from 'react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import {vinuChain} from "@/const";

const { publicClient, webSocketPublicClient } = configureChains(
  [vinuChain],
  [publicProvider()], //TODO::Maybe there is access for private provider???
);

const config = createConfig({
  autoConnect: false,
  publicClient,
  webSocketPublicClient,
});

export function Wagmi({ children }: PropsWithChildren) {
  //NOTE: This is known Wagmi bug https://github.com/wagmi-dev/wagmi/issues/542
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
