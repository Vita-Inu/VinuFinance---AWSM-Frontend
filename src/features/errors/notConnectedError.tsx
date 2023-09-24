import { useState } from 'react';

import { Button, BUTTON_PRESET } from '@/components/buttons';
import { WalletDescriptionModal } from '@/features/modals';

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
          <Title>Please, connect you wallet</Title>
          <Description>
            Please connect your wallet to see your loans, borrowings, and open
            positions
          </Description>
          <Buttons>
            <Button preset={BUTTON_PRESET.PINK}>Connect Wallet</Button>
            <Button preset={BUTTON_PRESET.WHITE}>Learn more</Button>
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
