import { useState } from 'react';

import { Container } from '@/components/container';
import { useWindowResize } from '@/hooks';

import { usePools } from './hooks';
import {
  DesktopTable,
  MobileTable,
  Filter,
  Filters,
  List,
  Wrapper,
} from './components';

export function LiquidityProviders() {
  const [filterKey, setFilterKey] = useState<string>();

  const { data } = usePools(filterKey);

  const { isTabletSize } = useWindowResize();

  return (
    <Container>
      <Wrapper>
        <Filters>
          <Filter
            $active={!filterKey}
            role={'button'}
            onClick={() => setFilterKey(undefined)}
          >
            All pools
          </Filter>
          <Filter
            $active={filterKey === 'CREATED'}
            role={'button'}
            onClick={() => setFilterKey('CREATED')}
          >
            My pools
          </Filter>
        </Filters>
        <List>
          {!isTabletSize && <DesktopTable data={data} />}
          {isTabletSize && <MobileTable data={data} />}
        </List>
      </Wrapper>
    </Container>
  );
}
