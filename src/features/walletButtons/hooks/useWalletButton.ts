import { Connector, useConnect } from 'wagmi';
import {vinuChain} from "@/const";

// import { vinuTestnet } from '@/features/wagmi';

type Props = {
  onSuccess: VoidFunction;
  connector: Connector<unknown, unknown>;
};

export const useWalletButton = ({ connector, onSuccess }: Props) => {
  const { connect, pendingConnector } = useConnect({
    connector,
    onSuccess,
    chainId: vinuChain.id,
  });

  return { connect, isConnecting: !!pendingConnector };
};
