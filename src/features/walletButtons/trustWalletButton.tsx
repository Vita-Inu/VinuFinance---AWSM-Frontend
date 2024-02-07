import { InjectedConnector } from '@wagmi/connectors/injected';
import type { WindowProvider } from '@wagmi/connectors'

import { vinuChain } from '@/const';

import { WalletButton } from './components';
import { useWalletButton } from './hooks';
import TrustWalletIcon from './assets/trustwallet.svg';

type Props = {
  disabled: boolean;
  onConnect: VoidFunction;
};

const getProvider = (): WindowProvider | undefined => {
  const injectedProviderExist = typeof window?.ethereum !== 'undefined'

  if(!injectedProviderExist) return

  if(window.ethereum?.isTrust) return window.ethereum

  if(window.ethereum?.providers) {
    return window.ethereum.providers.find((eth: NonNullable<Window['ethereum']>) => eth.isTrust)
  }

  return window.trustwallet as WindowProvider | undefined
}

export function TrustWalletButton({ disabled, onConnect }: Props) {
  const { connect } = useWalletButton({
    connector: new InjectedConnector({
      chains: [vinuChain],
      options: {
        name: 'trustwallet',
        shimDisconnect: true,
        getProvider
      }
    }),
    onSuccess: onConnect,
  });

  return (
    <WalletButton
      disabled={disabled}
      onClick={connect}
      icon={{
        src: TrustWalletIcon,
        alt: 'Trust wallet',
        width: 16,
        height: 16,
      }}
    >
      Trust wallet
    </WalletButton>
  );
}
