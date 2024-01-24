import { ModalBase } from '../modalBase';

type Props = {
  onClose: VoidFunction;
};

export function WalletDescriptionModal({ onClose }: Props) {
  return (
    <ModalBase title={'What is wallet?'} onClose={onClose}>
      <p>
        A wallet in decentralized finance (DeFi) is a digital tool for managing
        your cryptocurrencies. It securely stores your digital assets and allows
        you to conduct transactions on the blockchain. Wallets, available as
        web, mobile, desktop, or hardware versions, generate private keys
        (similar to passwords) for transaction authorization. In DeFi platforms
        like VinuFinance, a wallet isn&apos;t just for storage; it&apos;s your access
        point for activities like lending and borrowing. It&apos;s essential to keep
        your private keys safe, as they control access to your funds and enable
        you to interact with the DeFi ecosystem.
      </p>
    </ModalBase>
  );
}
