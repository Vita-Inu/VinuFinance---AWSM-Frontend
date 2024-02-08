import { WalletButton } from './components';
import TrustWalletIcon from './assets/trustwallet.svg';

type Props = {
  disabled: boolean;
};


export function TrustWalletLinkButton({ disabled }: Props) {
  return (
    <a href={`https://link.trustwallet.com/open_url`}>
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
