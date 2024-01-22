import Link from 'next/link';
import { useAccount } from 'wagmi';
import { usePathname } from 'next/navigation';
import { v4 as uuidV4 } from 'uuid';

import { Logo } from '@/components/logo';
import { Container } from '@/components/container';
import { ROUTE, URLS } from '@/utils';
import { ConnectButton } from '@/features/connectButton';
import { UserActions } from '@/features/dropdowns';
import { MobileMenu } from '@/features/mobileMenu';
import { WrapButton } from '@/features/wrapButton';
import { useWindowResize } from '@/hooks';

import { Menu, MenuItem, Row, Wrapper, Buttons } from './components';

export function Header() {
  const { address } = useAccount();

  const pathname = usePathname();

  const { isTabletSize } = useWindowResize();

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
            {!isTabletSize && (
              <Buttons>
                {!address && <ConnectButton />}
                {address && (
                  <>
                    <WrapButton/>
                    <UserActions address={address} />
                    {/*<Notifications />*/}
                  </>
                )}
              </Buttons>
            )}
            {isTabletSize && (
              <Buttons>
                {/*{address && <Notifications />}*/}
                <MobileMenu />
              </Buttons>
            )}
          </Row>
        </Container>
      </Wrapper>
    </>
  );
}
