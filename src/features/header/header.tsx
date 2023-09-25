import Link from 'next/link';
import { useAccount } from 'wagmi';

import { Logo } from '@/components/logo';
import { Container } from '@/components/container';
import { ROUTE } from '@/utils';
import { ConnectButton } from '@/features/connectButton';
import { DropdownMenu } from '@/features/dropdownMenu';

import { Menu, MenuItem, Row, Wrapper } from './components';

export function Header() {
  const { address } = useAccount();

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
            {!address && <ConnectButton />}
            {address && <DropdownMenu address={address} />}
          </Row>
        </Container>
      </Wrapper>
    </>
  );
}
