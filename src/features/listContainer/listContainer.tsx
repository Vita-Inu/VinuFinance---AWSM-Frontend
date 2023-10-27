import { ReactNode } from 'react';

import { Container } from '@/components/container';

import { Filters, List, Wrapper } from './components';
import { Filter } from './types';

type Props = {
  children: ReactNode;
  filters: Filter[];
  onFilter: (val: string) => void;
};

export function ListContainer({ children, filters, onFilter }: Props) {
  return (
    <Container>
      <Wrapper>
        <Filters filters={filters} onFilter={onFilter} />
        <List>{children}</List>
      </Wrapper>
    </Container>
  );
}
