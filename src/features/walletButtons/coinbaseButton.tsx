import { CoinbaseWalletConnector } from '@wagmi/connectors/coinbaseWallet';

import { vinuChain } from '@/const';

import { WalletButton } from './components';
import { useWalletButton } from './hooks';
import CoinbaseIcon from './assets/coinbase.svg';

type Props = {
  disabled: boolean;
  onConnect: VoidFunction;
};

export function CoinbaseButton({ disabled, onConnect }: Props) {
  const { connect } = useWalletButton({
    connector: new CoinbaseWalletConnector({
      chains: [vinuChain],
      options: { appName: 'wagmi' }
    }),
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
