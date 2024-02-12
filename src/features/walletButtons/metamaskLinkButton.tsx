import { WalletButton } from './components';
import MetamaskIcon from './assets/metamask.svg';

type Props = {
  disabled: boolean;
  onClick?: VoidFunction
};

export function MetamaskLinkButton({ disabled, onClick }: Props) {
  return (
    <a href={`https://metamask.app.link/dapp/${window.location.host}`} onClick={onClick}>
      <WalletButton
        disabled={disabled}
        icon={{
          src: MetamaskIcon,
          alt: 'Metamask',
          width: 17,
          height: 16,
        }}
      >
        Metamask
      </WalletButton>
    </a>
  );
}
