import { WalletButton } from './components';
import MetamaskIcon from './assets/metamask.svg';

type Props = {
  disabled: boolean;
};

export function MetamaskLinkButton({ disabled }: Props) {
  return (
    <a href={`https://metamask.app.link/dapp/${window.location.host}`}>
      <WalletButton
        connecting={false}
        disabled={disabled}
        onClick={() => undefined}
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
