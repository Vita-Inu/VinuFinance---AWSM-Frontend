import { useState } from 'react';

import { Container } from '@/components/container';
import { useWindowResize } from '@/hooks';

import { useLoans } from './hooks';
import {
  DesktopTable,
  MobileTable,
  Filter,
  Filters,
  List,
  Wrapper,
} from './components';

export function Loans() {
  const [filterKey, setFilterKey] = useState<string>();

  const { data } = useLoans(filterKey);

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
            Open loans
          </Filter>
          <Filter
            $active={filterKey === 'CLOSED'}
            role={'button'}
            onClick={() => setFilterKey('CLOSED')}
          >
            Past loans
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
