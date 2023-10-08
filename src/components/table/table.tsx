import { v4 as uuidV4 } from 'uuid';

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
};

export function Table<T extends { [key: string]: unknown }>({
  data,
  columns,
}: Props<T>) {
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
          <Row key={uuidV4()}>
            {columns.map(({ render, key }) => (
              <BodyCell key={uuidV4()}>
                {!!render && render(item)}
                {!render && <Value>{item[key]?.toString()}</Value>}
              </BodyCell>
            ))}
          </Row>
        ))}
      </Body>
    </STable>
  );
}
