import { useWindowResize } from '@/hooks';
import { ListContainer, useListFilter } from '@/features/listContainer';

import { useLoans } from './hooks';
import { DesktopTable, MobileTable } from './components';

export function Loans() {
  const { onFilter, filters, currentFilter } = useListFilter([
    { label: 'Open loans', value: 'OPEN_LOANS' },
    { label: 'Past loans', value: 'PAST_LOANS' },
  ]);

  const { data } = useLoans(currentFilter);

  const { isTabletSize } = useWindowResize();

  return (
    <ListContainer filters={filters} onFilter={onFilter}>
      <>
        {!isTabletSize && <DesktopTable data={data} />}
        {isTabletSize && <MobileTable data={data} />}
      </>
    </ListContainer>
  );
}
