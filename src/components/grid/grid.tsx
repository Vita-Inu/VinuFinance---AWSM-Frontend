import { v4 as uuidV4 } from 'uuid';

import { Cells, Cell, Wrapper } from './styled';
import { DataCell } from './types';

type Props<T> = {
  data: T;
  cells: DataCell<T>[];
};

export function Grid<T extends { [key: string]: unknown }>({
  data,
  cells,
}: Props<T>) {
  return (
    <Wrapper>
      <Cells>
        {cells.map(({ render, fullWidth }) => (
          <Cell key={uuidV4()} $fullWidth={fullWidth}>
            {render(data)}
          </Cell>
        ))}
      </Cells>
    </Wrapper>
  );
}
