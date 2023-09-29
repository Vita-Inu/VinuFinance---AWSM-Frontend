import { CoinbaseWalletConnector } from '@wagmi/connectors/coinbaseWallet';

import { WalletButton } from './components';
import { useWalletButton } from './hooks';

type Props = {
  disabled: boolean;
  onConnect: VoidFunction;
};

export function CoinbaseButton({ disabled, onConnect }: Props) {
  const { connect } = useWalletButton({
    connector: new CoinbaseWalletConnector({ options: { appName: 'wagmi' } }),
    onSuccess: onConnect,
  });

  return (
    <WalletButton
      disabled={disabled}
      onClick={connect}
      icon={{
        src: '/wallets/coinbase.svg',
        alt: 'Coinbase',
        width: 16,
        height: 16,
      }}
    >
      Coinbase
    </WalletButton>
  );
}
