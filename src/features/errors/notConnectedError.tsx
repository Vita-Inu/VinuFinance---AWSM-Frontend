import { useState } from 'react';

import { WalletDescriptionModal } from '@/features/modals';
import { ConnectButton } from '@/features/connectButton';

import {
  Buttons,
  Container,
  Description,
  Link,
  LinkWrapper,
  Title,
  Wrapper,
} from './components';

export function NotConnectedError() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const hideModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  return (
    <>
      <Wrapper>
        <Container>
          <Title>Please connect your wallet</Title>
          <Description>
            Please connect your wallet to see your loans, borrowings, and open
            positions
          </Description>
          <Buttons>
            <ConnectButton />
          </Buttons>
          <LinkWrapper>
            <Link onClick={showModal} role={'button'}>
              What is wallet?
            </Link>
          </LinkWrapper>
        </Container>
      </Wrapper>
      {isModalVisible && <WalletDescriptionModal onClose={hideModal} />}
    </>
  );
}
