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
  data: T[];
  onRowClick?: (val: T) => void;
};

export function Table<T extends { key: string }>({
  data,
  columns,
  onRowClick,
}: Props<T>) {
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  const onRowLeave = (item: { key: string }) => {
    setHoveredItemId((prev) => (prev !== item.key ? prev : null));
  };

  const onRowEnter = (item: { key: string }) => {
    setHoveredItemId((prev) => (prev !== item.key ? item.key : prev));
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
            key={item.key}
            $clickable={!!onRowClick}
            onClick={() => onRowClick?.(item)}
            onMouseEnter={() => onRowEnter(item)}
            onMouseLeave={() => onRowLeave(item)}
          >
            {columns.map(({ render, key }) => (
              <BodyCell key={uuidV4()}>
                {!!render &&
                  render(item, { hovered: item.key === hoveredItemId })}
              </BodyCell>
            ))}
          </Row>
        ))}
      </Body>
    </STable>
  );
}
