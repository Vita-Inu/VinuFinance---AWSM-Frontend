import Link from 'next/link';
import { useAccount } from 'wagmi';
import { usePathname } from 'next/navigation';
import { v4 as uuidV4 } from 'uuid';

import { Logo } from '@/components/logo';
import { Container } from '@/components/container';
import { ROUTE } from '@/utils';
import { ConnectButton } from '@/features/connectButton';
import { UserActions, Notifications } from '@/features/dropdowns';

import { Menu, MenuItem, Row, Wrapper, Buttons } from './components';

const URLS = [
  {
    url: ROUTE.BORROW,
    label: 'Borrow',
  },
  {
    url: ROUTE.LOANS,
    label: 'Manage Loans',
  },
  {
    url: ROUTE.LIQUIDITY_PROVIDERS,
    label: 'LP',
  },
];

export function Header() {
  const { address } = useAccount();

  const pathname = usePathname();

  return (
    <>
      <Wrapper>
        <Container>
          <Row>
            <Link href={ROUTE.HOME}>
              <Logo />
            </Link>
            <Menu>
              {URLS.map(({ url, label }) => (
                <Link key={uuidV4()} href={url}>
                  <MenuItem $active={url === pathname}>{label}</MenuItem>
                </Link>
              ))}
            </Menu>
            {!address && <ConnectButton />}
            {address && (
              <Buttons>
                <UserActions address={address} />
                <Notifications />
              </Buttons>
            )}
          </Row>
        </Container>
      </Wrapper>
    </>
  );
}
