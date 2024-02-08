import { WalletButton } from './components';
import MetamaskIcon from './assets/metamask.svg';

type Props = {
  disabled: boolean;
};

export function MetamaskLinkButton({ disabled }: Props) {
  return (
    <a href={`https://metamask.app.link/dapp/${window.location.host}`}>
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
