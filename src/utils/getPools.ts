import {getContract, parseAbiItem, PublicClient} from "viem";
import {CHAIN_INFO, IControllerAbi, IPoolAbi} from "@/const";
import {multicall} from "@wagmi/core";
import {info} from "next/dist/build/output/log";

export type PoolInfo = {
    0: `0x{string}`; // loanToken
    1: `0x{string}`; // collToken
    2: bigint; // maxLoanPerColl
    3: bigint; // minLoan
    4: bigint; // loanTenor
    5: bigint; // totalLiquidity
    6: bigint; // totalLpShares
    7: bigint; // rewardCoefficient
    8: bigint; // loanIdx
}

export type Pool = {
    address: `0x{string}`;
    info: PoolInfo;
}

export async function getPools(client: PublicClient, chainId: number): Promise<Pool[]> {
    let logs = await client.getLogs({
        event: parseAbiItem('event NewSubPool(address loanCcyToken,address collCcyToken,uint256 loanTenor,uint256 maxLoanPerColl,uint256 r1,uint256 r2,uint256 liquidityBnd1,uint256 liquidityBnd2,uint256 minLoan,uint256 creatorFee,address poolController,uint96 rewardCoefficient)'),
        fromBlock: 'earliest'
    })

    // gather potential pool addresses where controller is our controller
    let potentialPools = logs.filter(x => {
        return x.args.poolController!.toLowerCase() == CHAIN_INFO[chainId].CONTROLLER.toLowerCase()
    })

    let controller = getContract({
        // @ts-ignore
        address: CHAIN_INFO[chainId].CONTROLLER,
        abi: IControllerAbi,
        publicClient: client
    })

    // get whitelist boolean for every pool
    // use multicall yeah
    let whitelists = await multicall({
        // @ts-ignore
        contracts: potentialPools.map(x => {
            return {
                address: CHAIN_INFO[chainId].CONTROLLER,
                abi: IControllerAbi,
                functionName: 'poolWhitelisted',
                args: [x.address]
            }
        })
    })

    let pools = potentialPools.filter((pool, index) => whitelists[index].result).map(x => getContract({
        address: x.address,
        abi: IPoolAbi,
    }))
    // gather infos using contract.getPoolInfo
    let infos = await multicall({
        // @ts-ignore
        contracts: pools.map(x => {
            return {
                ...x,
                functionName: 'getPoolInfo'
            }
        })
    })

    return infos.map((info, index) => {
        return {
            address: pools[index].address as `0x{string}`, // we know this for sure
            info: info.result as PoolInfo
        }
    })
}
