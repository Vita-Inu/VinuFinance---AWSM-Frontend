import { WalletConnectConnector } from '@wagmi/connectors/walletConnect';

import { WalletButton } from './components';
import { useWalletButton } from './hooks';

type Props = {
  disabled: boolean;
  onConnect: VoidFunction;
};

export function WalletConnectButton({ disabled, onConnect }: Props) {
  const { connect } = useWalletButton({
    connector: new WalletConnectConnector({ options: { projectId: '...' } }),
    onSuccess: () => onConnect(),
  });

  return (
    <WalletButton
      disabled={disabled}
      onClick={connect}
      icon={{
        src: '/wallets/walletconnect.svg',
        alt: 'Wallet connect',
        width: 16,
        height: 16,
      }}
    >
      Walletconnect
    </WalletButton>
  );
}
