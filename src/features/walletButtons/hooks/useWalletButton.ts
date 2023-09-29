import { Connector, useConnect } from 'wagmi';

import { vinuTestnet } from '@/features/wagmi';

type Props = {
  onSuccess: VoidFunction;
  connector: Connector<unknown, unknown>;
};

export const useWalletButton = ({ connector, onSuccess }: Props) => {
  const { connect } = useConnect({
    connector,
    onSuccess,
    chainId: vinuTestnet.id,
  });

  return { connect };
};
