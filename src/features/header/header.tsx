import { useState } from 'react';
import Link from 'next/link';

import { LoginModal } from '@/features/modals';
import { Logo } from '@/components/logo';
import { Button, BUTTON_PRESET } from '@/components/buttons';
import { Container } from '@/components/container';
import { ROUTE } from '@/utils';

import { Menu, MenuItem, Row, Wrapper } from './components';

export function Header() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => setIsModalVisible(true);

  const hideModal = () => setIsModalVisible(false);

  return (
    <>
      <Wrapper>
        <Container>
          <Row>
            <Link href={ROUTE.HOME}>
              <Logo />
            </Link>
            <Menu>
              <Link href={'#'}>
                <MenuItem $active={true}>Borrow</MenuItem>
              </Link>
              <Link href={'#'}>
                <MenuItem $active={false}>Manage Loans</MenuItem>
              </Link>
              <Link href={'#'}>
                <MenuItem $active={false}>LP</MenuItem>
              </Link>
            </Menu>
            <Button preset={BUTTON_PRESET.PINK} onClick={showModal}>
              Connect Wallet
            </Button>
          </Row>
        </Container>
      </Wrapper>
      {isModalVisible && <LoginModal onClose={hideModal} />}
    </>
  );
}
