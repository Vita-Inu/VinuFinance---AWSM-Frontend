import { MetaMaskConnector } from '@wagmi/connectors/metaMask';

import { WalletButton } from './components';
import { useWalletButton } from './hooks';
import MetamaskIcon from './assets/metamask.svg';

type Props = {
  disabled: boolean;
  onConnect: VoidFunction;
};

export function MetamaskButton({ disabled, onConnect }: Props) {
  const { connect } = useWalletButton({
    connector: new MetaMaskConnector(),
    onSuccess: onConnect,
  });

  return (
    <WalletButton
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
