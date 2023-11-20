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
  data: (T & { uniqueId: string })[];
  onRowClick?: (val: T) => void;
};

export function Table<T extends { [key: string]: unknown }>({
  data,
  columns,
  onRowClick,
}: Props<T>) {
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  const onRowLeave = (item: { uniqueId: string }) => {
    setHoveredItemId((prev) => (prev !== item.uniqueId ? prev : null));
  };

  const onRowEnter = (item: { uniqueId: string }) => {
    setHoveredItemId((prev) => (prev !== item.uniqueId ? item.uniqueId : prev));
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
            key={item.uniqueId}
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
