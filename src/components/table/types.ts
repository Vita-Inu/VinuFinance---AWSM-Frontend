import { ReactNode } from 'react';

type State = {
  hovered: boolean;
};

export type Column<T> = {
  label: string;
  key: keyof T | string;
  render?: (row: T, state: State) => ReactNode;
};

export type ValueWithExplain = {
  value: string;
  explain: string;
};
