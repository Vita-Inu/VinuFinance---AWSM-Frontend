import {ChangeEvent, useState} from "react";

import {Agreement} from "@/features/inputs";
import {WalletButton} from "@/components/buttons";

import {ModalBase} from "../modalBase";

import {Link, Agreements, Buttons} from "./components";

type Props = {
    onClose: VoidFunction
}

const DEFAULT_AGREEMENTS_STATE = {
    country: false,
    policy: false,
    vpn: false
}

export function LoginModal({onClose}: Props) {
    const [agreements, setAgreements] = useState<typeof DEFAULT_AGREEMENTS_STATE>(DEFAULT_AGREEMENTS_STATE)

    const handleAgreementChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setAgreements((prevState) => {
            if (!Object.keys(agreements).includes(evt.target.name)) return prevState

            return {
                ...prevState,
                [evt.target.name]: evt.target.checked
            }
        })
    }

    const canLogin = Object.values(agreements).every((val) => val)

    const handleLogin = () => {
        //TODO:: Use wallet enum. Maybe from wagmi???
        //TODO:: Handle wagmi wallet connect

        if(!canLogin) return;
    }

    return (
        <ModalBase title={'Connect a wallet'} onClose={onClose}>
            <Buttons>
                <WalletButton
                    disabled={!canLogin}
                    onClick={handleLogin}
                    icon={{
                        src: '/wallets/metamask.svg',
                        alt: 'Metamask',
                        width: 17,
                        height: 16
                    }}
                >Metamask</WalletButton>
                <WalletButton
                    disabled={!canLogin}
                    onClick={handleLogin}
                    icon={{
                        src: '/wallets/coinbase.svg',
                        alt: 'Coinbase',
                        width: 16,
                        height: 16
                    }}
                >Metamask</WalletButton>
                <WalletButton
                    disabled={!canLogin}
                    onClick={handleLogin}
                    icon={{
                        src: '/wallets/walletconnect.svg',
                        alt: 'Wallet connect',
                        width: 16,
                        height: 16
                    }}
                >Metamask</WalletButton>
            </Buttons>
            <Agreements>
                <Agreement name={'country'} checked={agreements.country} onChange={handleAgreementChange}>I confirm that
                    I am not a resident of any of the
                    following
                    countries: Belarus, the Central African Republic, the Democratic Republic of Congo, the Democratic
                    People’s Republic of Korea, the Crimea region of Ukraine, Russia, Cuba, Iran, Libya, Somalia, Sudan,
                    South Sudan, Syria, the USA, Yemen, and Zimbabwe or any other jurisdiction in which accessing or
                    using the Protocol is or may be prohibited (“Prohibited Jurisdictions”).</Agreement>
                <Agreement name={'vpn'} checked={agreements.vpn} onChange={handleAgreementChange}>
                    I confirm that I am not located in, incorporated or otherwise established in, or a citizen or
                    resident of, a Prohibited Jurisdiction, use a VPN to pretend not to be from a Prohibited
                    Jurisdiction, or that I am the subject of economic or trade sanctions administered or enforced by
                    any governmental authority or otherwise designated on any list of prohibited or restricted parties.
                </Agreement>
                <Agreement name={'policy'} checked={agreements.policy} onChange={handleAgreementChange}>I confirm that I
                    have read, understand and accept the <Link href={'#'}>Terms and Conditions</Link> and
                    the <Link href={'#'}>Privacy Policy</Link></Agreement>
            </Agreements>
        </ModalBase>
    )
}