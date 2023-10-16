import { Connector, mainnet, useConnect } from 'wagmi';

// import { vinuTestnet } from '@/features/wagmi';

type Props = {
  onSuccess: VoidFunction;
  connector: Connector<unknown, unknown>;
};

export const useWalletButton = ({ connector, onSuccess }: Props) => {
  const { connect } = useConnect({
    connector,
    onSuccess,
    chainId: mainnet.id,
  });

  return { connect };
};
