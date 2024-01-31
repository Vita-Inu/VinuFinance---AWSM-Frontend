import { UAParser } from 'ua-parser-js';

import { Agreement } from '@/components/inputs';
import { CoinbaseButton, MetamaskButton, TrustWalletButton, MetamaskLinkButton, WalletConnectButton } from '@/features/walletButtons';

import { ModalBase } from '../modalBase';

import { useConnectModal } from './hooks';
import { Link, Agreements, Buttons } from './components';

type Props = {
  onClose: VoidFunction;
};

export function ConnectModal({ onClose }: Props) {
  const { agreements, handleAgreementChange, canLogin } = useConnectModal();

  const parsedUserAgent = (new UAParser()).getResult();

  const haveMetaMask = !!window?.ethereum?.isMetaMask;

  return (
    <ModalBase title={'Connect a wallet'} onClose={onClose}>
      <Buttons>
        {haveMetaMask && (
          <MetamaskButton disabled={!canLogin} onConnect={onClose} />
        )}
        {!haveMetaMask && ['mobile', 'tablet'].includes(parsedUserAgent.device.type ?? '') && (
          <MetamaskLinkButton disabled={!canLogin}/>
        )}
        <WalletConnectButton disabled={!canLogin} onConnect={onClose} />
        <CoinbaseButton disabled={!canLogin} onConnect={onClose} />
        <TrustWalletButton disabled={!canLogin} onConnect={onClose} />
      </Buttons>
      <Agreements>
        <Agreement
          name={'country'}
          checked={agreements.country}
          onChange={handleAgreementChange}
        >
          I confirm that I am not a resident of any of the following countries:
          Belarus, the Central African Republic, the Democratic Republic of
          Congo, the Democratic People’s Republic of Korea, the Crimea region of
          Ukraine, Russia, Cuba, Iran, Libya, Somalia, Sudan, South Sudan,
          Syria, the USA, Yemen, and Zimbabwe or any other jurisdiction in which
          accessing or using the Protocol is or may be prohibited (“Prohibited
          Jurisdictions”).
        </Agreement>
        <Agreement
          name={'vpn'}
          checked={agreements.vpn}
          onChange={handleAgreementChange}
        >
          I confirm that I am not located in, incorporated or otherwise
          established in, or a citizen or resident of, a Prohibited
          Jurisdiction, use a VPN to pretend not to be from a Prohibited
          Jurisdiction, or that I am the subject of economic or trade sanctions
          administered or enforced by any governmental authority or otherwise
          designated on any list of prohibited or restricted parties.
        </Agreement>
        <Agreement
          name={'policy'}
          checked={agreements.policy}
          onChange={handleAgreementChange}
        >
          I confirm that I have read, understand and accept the{' '}
          <Link href={'#'}>Terms and Conditions</Link> and the{' '}
          <Link href={'#'}>Privacy Policy</Link>
        </Agreement>
      </Agreements>
    </ModalBase>
  );
}
