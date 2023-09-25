import { useConnect } from 'wagmi';
import { MetaMaskConnector } from '@wagmi/connectors/metaMask';

import { WalletButton } from '@/components/buttons';

type Props = {
  disabled: boolean;
  onConnect: VoidFunction;
};

export function MetamaskButton({ disabled, onConnect }: Props) {
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
    onSuccess: () => onConnect(),
  });

  return (
    <WalletButton
      disabled={disabled}
      onClick={connect}
      icon={{
        src: '/wallets/metamask.svg',
        alt: 'Metamask',
        width: 17,
        height: 16,
      }}
    >
      Metamask
    </WalletButton>
  );
}
