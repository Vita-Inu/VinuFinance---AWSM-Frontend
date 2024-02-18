import { Connector } from 'wagmi';
import { CoinbaseWalletConnector } from '@wagmi/connectors/coinbaseWallet';

import { vinuChain } from '@/const';

import { WalletButton } from './components';
import { useWalletButton } from './hooks';
import CoinbaseIcon from './assets/coinbase.svg';


type Props = {
  disabled: boolean;
  onConnect: VoidFunction;
  connector: Connector
};

export const getCoinbaseConnector = () => {
  return new CoinbaseWalletConnector({
    chains: [vinuChain],
    options: { appName: 'wagmi' }
  })
}

export function CoinbaseButton({ disabled, onConnect, connector }: Props) {
  const { connect } = useWalletButton({
    connector,
    onSuccess: onConnect,
  });

  return (
    <WalletButton
      disabled={disabled}
      onClick={connect}
      icon={{
        src: CoinbaseIcon,
        alt: 'Coinbase',
        width: 16,
        height: 16,
      }}
    >
      Coinbase
    </WalletButton>
  );
}
