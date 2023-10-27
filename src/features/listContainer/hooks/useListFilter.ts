import { useState } from 'react';

import { Filter } from '../types';

export const useListFilter = (options: { label: string; value: string }[]) => {
  const [filters, setFilters] = useState<Filter[]>(
    options.map((item, index) => ({ ...item, active: index === 0 })),
  );

  const onFilter = (val: string) => {
    setFilters((prevState) =>
      prevState.map((item) => ({ ...item, active: item.value === val })),
    );
  };

  return {
    filters,
    onFilter,
    currentFilter: filters.find(({ active }) => active)?.value,
  };
};
