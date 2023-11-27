import {getContract, parseAbiItem, PublicClient} from "viem";
import {CHAIN_INFO, IControllerAbi, IErc20Abi, IPoolAbi} from "@/const";
import {multicall} from "@wagmi/core";
import {info} from "next/dist/build/output/log";
import {Pool} from "@/utils/getPools";

export type Tokens = Map<string, {symbol: string, decimals: number}>

export async function getErc20sFromPools(client: PublicClient, chainId: number, pools: Pool[]): Promise<Tokens> {
    let allTokens = pools.map(x => x.info[0]).concat(pools.map(x => x.info[1]))
        // only unique tokens
        .filter(
            (thing, i, arr) => arr.findIndex(x => x == thing) === i
        );
    let decimals = await multicall({
        contracts: allTokens.map(x => {
            return {
                address: x,
                abi: IErc20Abi,
                functionName: 'decimals'
            }
        })
    })
    let symbols = await multicall({
        contracts: allTokens.map(x => {
            return {
                address: x,
                abi: IErc20Abi,
                functionName: 'symbol'
            }
        })
    })

    let result = allTokens.map((x, i) => [x, {symbol: symbols[i].result as string, decimals: decimals[i].result as number}])
    // @ts-ignore
    return new Map<string, {symbol: string, decimals: number}>(result)
}
