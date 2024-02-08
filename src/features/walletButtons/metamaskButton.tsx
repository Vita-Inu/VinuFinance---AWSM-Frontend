import { MetaMaskConnector } from '@wagmi/connectors/metaMask';
import type { WindowProvider } from '@wagmi/connectors';

import { vinuChain } from '@/const';

import { WalletButton } from './components';
import { useWalletButton } from './hooks';
import MetamaskIcon from './assets/metamask.svg';

type Props = {
  disabled: boolean;
  onConnect: VoidFunction;
};

export const getMetamaskProvider = (): WindowProvider | undefined => {
  const injectedProviderExist = typeof window?.ethereum !== 'undefined'

  if(!injectedProviderExist) return

  if(window.ethereum?.isMetaMask) return window.ethereum

  if(window.ethereum?.providers) {
    return window.ethereum.providers.find((eth: NonNullable<Window['ethereum']>) => eth.isMetaMask)
  }
}

export function MetamaskButton({ disabled, onConnect }: Props) {
  const { connect, isConnecting } = useWalletButton({
    connector: new MetaMaskConnector({chains: [vinuChain]}),
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
