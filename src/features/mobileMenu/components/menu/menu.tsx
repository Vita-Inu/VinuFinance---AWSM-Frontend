import NextLink from 'next/link';
import { v4 as uuidV4 } from 'uuid';
import { usePathname } from 'next/navigation';

import { URLS } from '@/utils';

import { Item, Items, Wrapper } from './styled';

export function Menu() {
  const pathname = usePathname();

  return (
    <Wrapper>
      <Items>
        {URLS.map(({ url, label }) => (
          <NextLink href={url} key={uuidV4()}>
            <Item $active={url === pathname}>{label}</Item>
          </NextLink>
        ))}
      </Items>
    </Wrapper>
  );
}
