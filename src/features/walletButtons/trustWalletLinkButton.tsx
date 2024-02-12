import { WalletButton } from './components';
import TrustWalletIcon from './assets/trustwallet.svg';

type Props = {
  disabled: boolean;
  onClick?: VoidFunction
};


export function TrustWalletLinkButton({ disabled, onClick }: Props) {
  return (
    <a href={`https://link.trustwallet.com/open_url`} onClick={onClick}>
      <WalletButton
        disabled={disabled}
        icon={{
          src: TrustWalletIcon,
          alt: 'Trust wallet',
          width: 16,
          height: 16,
        }}
      >
        Trust wallet
      </WalletButton>
    </a>
  );
}
