import { v4 as uuidV4 } from 'uuid';
import { useState } from 'react';

import {
  Table as STable,
  Body,
  Row,
  Head,
  HeadCell,
  BodyCell,
  Value,
} from './styled';
import { Column } from './types';

type Props<T> = {
  columns: Column<T>[];
  data: (T & { id: string })[];
  onRowClick?: (val: T) => void;
};

export function Table<T extends { [key: string]: unknown }>({
  data,
  columns,
  onRowClick,
}: Props<T>) {
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  const onRowLeave = (item: { id: string }) => {
    setHoveredItemId((prev) => (prev !== item.id ? prev : null));
  };

  const onRowEnter = (item: { id: string }) => {
    setHoveredItemId((prev) => (prev !== item.id ? item.id : prev));
  };

  return (
    <STable>
      <Head>
        <Row>
          {columns.map(({ label }) => (
            <HeadCell key={uuidV4()}>{label}</HeadCell>
          ))}
        </Row>
      </Head>
      <Body>
        {data.map((item) => (
          <Row
            key={item.id}
            $clickable={!!onRowClick}
            onClick={() => onRowClick?.(item)}
            onMouseEnter={() => onRowEnter(item)}
            onMouseLeave={() => onRowLeave(item)}
          >
            {columns.map(({ render, key }) => (
              <BodyCell key={uuidV4()}>
                {!!render &&
                  render(item, { hovered: item.id === hoveredItemId })}
                {!render && <Value>{item[key]?.toString()}</Value>}
              </BodyCell>
            ))}
          </Row>
        ))}
      </Body>
    </STable>
  );
}
