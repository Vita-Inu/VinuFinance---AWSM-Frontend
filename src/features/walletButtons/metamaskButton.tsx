import { Connector } from 'wagmi';
import { MetaMaskConnector } from '@wagmi/connectors/metaMask';

import { vinuChain } from '@/const';

import { WalletButton } from './components';
import { useWalletButton } from './hooks';
import MetamaskIcon from './assets/metamask.svg';

type Props = {
  disabled: boolean;
  onConnect: VoidFunction;
  connector: Connector
};

export const getMetamaskConnector = () => {
  return new MetaMaskConnector({chains: [vinuChain], options: {shimDisconnect: true}})
}

export function MetamaskButton({ disabled, onConnect, connector }: Props) {
  const { connect, isConnecting } = useWalletButton({
    connector,
    onSuccess: onConnect,
  });

  return (
    <WalletButton
      connecting={isConnecting}
      disabled={disabled}
      onClick={connect}
      icon={{
        src: MetamaskIcon,
        alt: 'Metamask',
        width: 17,
        height: 16,
      }}
    >
      Metamask
    </WalletButton>
  );
}
