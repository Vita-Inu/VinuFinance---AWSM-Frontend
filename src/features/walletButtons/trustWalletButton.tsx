import { InjectedConnector } from '@wagmi/connectors/injected';
import type { WindowProvider } from '@wagmi/connectors'

import { vinuChain } from '@/const';

import { WalletButton } from './components';
import { useWalletButton } from './hooks';
import CoinbaseIcon from './assets/coinbase.svg';

type Props = {
  disabled: boolean;
  onConnect: VoidFunction;
};

export function TrustWalletButton({ disabled, onConnect }: Props) {
  const { connect } = useWalletButton({
    connector: new InjectedConnector({
      chains: [vinuChain],
      options: {
        name: 'trustwallet',
        shimDisconnect: true,
        getProvider: () => window?.trustwallet as WindowProvider | undefined
      }
    }),
    onSuccess: onConnect,
  });

  return (
    <WalletButton
      disabled={disabled}
      onClick={connect}
      icon={{
        src: CoinbaseIcon,
        alt: 'Trust wallet',
        width: 16,
        height: 16,
      }}
    >
      Trust wallet
    </WalletButton>
  );
}
