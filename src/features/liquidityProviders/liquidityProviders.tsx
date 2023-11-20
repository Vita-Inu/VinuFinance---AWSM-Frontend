import {useEffect, useState} from 'react';

import {useWindowResize} from '@/hooks';
import {ListContainer} from '@/features/listContainer';
import {useListFilter} from '@/features/listContainer/hooks';
import {LiquidityPoolModal} from '@/features/modals';

import {DesktopTable, MobileTable} from './components';
import {getPools, Pool} from "@/utils/getPools";
import {useAccount, useNetwork, usePublicClient} from "wagmi";
import {getErc20sFromPools} from "@/utils/getErc20sFromPools";

export class PoolWithInfo {
    pool: Pool;
    loanCurrency: {
        decimals: number;
        symbol: string;
    };
    collCurrency: {
        decimals: number;
        symbol: string;
    };
    currentMonthlyApr: number;
}

export function LiquidityProviders() {
    const [liquidityPoolId, setLiquidityPoolId] = useState<string | null>(null);
    const {address} = useAccount()
    let client = usePublicClient()
    const {chain} = useNetwork()

    const {onFilter, filters, currentFilter} = useListFilter([
        {label: 'All pools', value: 'ALL_POOLS'},
        {label: 'My pools', value: 'MY_POOLS'},
    ]);

    useEffect(() => {
        loadData().catch(err => {
            console.log('failed to load data:', err)
        })
    }, []);

    async function loadData() {
        if (!chain) return
        let pools = await getPools(client, chain.id)
        let ercs = await getErc20sFromPools(client, chain.id, pools)
        setData(pools.map(x => {
            return {
                pool: x,
                currentMonthlyApr: 1.17 / 100,
                loanCurrency: ercs.get(x.info[0]),
                collCurrency: ercs.get(x.info[1])
            }
        }))
        console.log(pools)
    }

    const [data, setData] = useState<PoolWithInfo[]>([])

    const {isTabletSize} = useWindowResize();

    const showPoolDetails = (poolId: string) => {
        setLiquidityPoolId(poolId);
    };

    const hidePoolDetails = () => {
        setLiquidityPoolId(null);
    };

    return (
        <ListContainer filters={filters} onFilter={onFilter}>
            <>
                {!isTabletSize && <DesktopTable data={data} onView={showPoolDetails}/>}
                {isTabletSize && <MobileTable data={data} onView={showPoolDetails}/>}
                {!!liquidityPoolId && (
                    <LiquidityPoolModal
                        onClose={hidePoolDetails}
                        pool={data.find(x => x.pool.address == liquidityPoolId)!}
                    />
                )}
            </>
        </ListContainer>
    );
}
