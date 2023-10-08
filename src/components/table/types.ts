import { ReactNode } from 'react';

export type Column<T> = {
  label: string;
  key: keyof T | string;
  render?: (row: T) => ReactNode;
};

export type ValueWithExplain = {
  value: string;
  explain: string;
};
