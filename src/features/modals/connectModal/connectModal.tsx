import { UAParser } from 'ua-parser-js';
import { useConfig } from 'wagmi';

import { Agreement } from '@/components/inputs';
import { CoinbaseButton, MetamaskButton, TrustWalletButton, MetamaskLinkButton, WalletConnectButton, TrustWalletLinkButton } from '@/features/walletButtons';
import { confirmAgreements } from '@/utils';

import { ModalBase } from '../modalBase';

import { useConnectModal } from './hooks';
import { Link, Agreements, Buttons } from './components';

type Props = {
  onClose: VoidFunction;
};

export function ConnectModal({ onClose }: Props) {
  const { agreements, handleAgreementChange, canLogin } = useConnectModal();

  const parsedUserAgent = (new UAParser()).getResult();
  const isMobile = ['mobile', 'tablet'].includes(parsedUserAgent.device.type ?? '')

  const {connectors} = useConfig()

  const onConnect = () => {
    confirmAgreements()
    onClose()
  }

  return (
    <ModalBase title={'Connect a wallet'} onClose={onClose}>
      <Buttons>
        {connectors.map((connector) => {
          if(connector.id === 'metaMask') {
            if(connector.ready) {
              return <MetamaskButton key={'metamask'} disabled={!canLogin} onConnect={onConnect} connector={connector} />
            }

            if(!connector.ready && isMobile) {
              return <MetamaskLinkButton key={'metamaskMobile'} disabled={!canLogin} onClick={onConnect}/>
            }
          }

          if(connector.id === 'walletConnect' && connector.ready) {
            return <WalletConnectButton key={'walletconnect'} disabled={!canLogin} onConnect={onConnect} connector={connector} />
          }

          if(connector.id === 'coinbaseWallet' && connector.ready) {
            return <CoinbaseButton key={'coinbasewallet'} disabled={!canLogin} onConnect={onConnect} connector={connector} />
          }

          if(connector.name === 'trustwallet') {
            if(connector.ready) {
              return <TrustWalletButton key={'trustwallet'} disabled={!canLogin} onConnect={onConnect} connector={connector} />
            }

            if(!connector.ready && isMobile) {
              return <TrustWalletLinkButton key={'trustwalletMobile'} disabled={!canLogin} onClick={onConnect} />
            }
          }
        })}
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
