import { useState } from 'react';

import { useWindowResize } from '@/hooks';
import { ListContainer } from '@/features/listContainer';
import { useListFilter } from '@/features/listContainer/hooks';
import { LiquidityPoolModal } from '@/features/modals';

import { usePools } from './hooks';
import { DesktopTable, MobileTable } from './components';

export function LiquidityProviders() {
  const [liquidityPoolId, setLiquidityPoolId] = useState<string | null>(null);

  const { onFilter, filters, currentFilter } = useListFilter([
    { label: 'All pools', value: 'ALL_POOLS' },
    { label: 'My pools', value: 'MY_POOLS' },
  ]);

  const { data } = usePools(currentFilter);

  const { isTabletSize } = useWindowResize();

  const showPoolDetails = (poolId: string) => {
    setLiquidityPoolId(poolId);
  };

  const hidePoolDetails = () => {
    setLiquidityPoolId(null);
  };

  return (
    <ListContainer filters={filters} onFilter={onFilter}>
      <>
        {!isTabletSize && <DesktopTable data={data} onView={showPoolDetails} />}
        {isTabletSize && <MobileTable data={data} onView={showPoolDetails} />}
        {!!liquidityPoolId && (
          <LiquidityPoolModal
            onClose={hidePoolDetails}
            poolId={liquidityPoolId}
          />
        )}
      </>
    </ListContainer>
  );
}
