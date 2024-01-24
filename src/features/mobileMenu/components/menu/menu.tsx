import NextLink from 'next/link';
import { v4 as uuidV4 } from 'uuid';
import { usePathname } from 'next/navigation';
import { useAccount } from 'wagmi';

import { URLS } from '@/utils';
import { UserActions } from '@/features/dropdowns';
import { WrapButton } from '@/features/wrapButton';
import { BridgeButton } from '@/features/bridgeButton';

import { Item, Items, Wrapper, Bottom, Content } from './styled';

export function Menu() {
  const { address } = useAccount();

  const pathname = usePathname();

  return (
    <Wrapper>
      <Content>
        <Items>
          {URLS.map(({ url, label }) => (
            <NextLink href={url} key={uuidV4()}>
              <Item $active={url === pathname}>{label}</Item>
            </NextLink>
          ))}
        </Items>
      </Content>
      <Bottom>
        <BridgeButton/>
        {address && (
          <>
            <WrapButton/>
            <UserActions address={address} />
          </>
        )}
      </Bottom>
    </Wrapper>
  );
}
