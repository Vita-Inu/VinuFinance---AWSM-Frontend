import { WalletConnectConnector } from '@wagmi/connectors/walletConnect';

import { vinuChain, WALLET_CONNECT_PROJECT_ID } from '@/const';

import { WalletButton } from './components';
import { useWalletButton } from './hooks';
import WalletConnectIcon from './assets/walletconnect.svg';

type Props = {
  disabled: boolean;
  onConnect: VoidFunction;
};

export function WalletConnectButton({ disabled, onConnect }: Props) {
  const { connect } = useWalletButton({
    connector: new WalletConnectConnector({
      chains: [vinuChain],
      options: {
        projectId: WALLET_CONNECT_PROJECT_ID,
        qrModalOptions: { themeVariables: { '--wcm-z-index': 100 } },
      },
    }),
    onSuccess: () => onConnect(),
  });

  return (
    <WalletButton
      disabled={disabled}
      onClick={connect}
      icon={{
        src: WalletConnectIcon,
        alt: 'Wallet connect',
        width: 16,
        height: 16,
      }}
    >
      Walletconnect
    </WalletButton>
  );
}
