import { useWindowResize } from '@/hooks';
import { ListContainer } from '@/features/listContainer';
import { useListFilter } from '@/features/listContainer/hooks';

import { usePools } from './hooks';
import { DesktopTable, MobileTable } from './components';

export function LiquidityProviders() {
  const { onFilter, filters, currentFilter } = useListFilter([
    { label: 'All pools', value: 'ALL_POOLS' },
    { label: 'My pools', value: 'MY_POOLS' },
  ]);

  const { data } = usePools(currentFilter);

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
