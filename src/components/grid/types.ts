import { ReactNode } from 'react';

export type DataCell<T> = {
  render: (row: T) => ReactNode;
};
