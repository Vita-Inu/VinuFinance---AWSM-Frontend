import { useState } from 'react';

import { Button } from '@/components/buttons';
import { WalletDescriptionModal } from '@/features/modals';

import {
  Wrapper,
  Container,
  LinkWrapper,
  Link,
  Buttons,
  Title,
  Description,
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
            <Button background={'#DFCEFD'} text={'#000'}>
              Connect Wallet
            </Button>
            <Button background={'#FFF'} text={'#000'}>
              Learn more
            </Button>
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
