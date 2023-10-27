import { v4 as uuidV4 } from 'uuid';

import { Filter } from '../../types';

import { Item, Wrapper } from './styled';

type Props = {
  filters: Filter[];
  onFilter: (value: string) => void;
};

export function Filters({ filters, onFilter }: Props) {
  return (
    <Wrapper>
      {filters.map(({ label, value, active }) => (
        <Item key={uuidV4()} $active={active} onClick={() => onFilter(value)}>
          {label}
        </Item>
      ))}
    </Wrapper>
  );
}
