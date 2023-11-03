import {getContract, parseAbiItem, PublicClient} from "viem";
import {CHAIN_INFO, IControllerAbi, IPoolAbi} from "@/const";

export type PoolInfo = {
    0: `0x{string}`;
    1: `0x{string}`;
    2: number; // maxLoanPerColl
    3: number; // minLoan
    4: number; // loanTenor
    5: number; // totalLiquidity
    6: number; // totalLpShares
    7: number; // rewardCoefficient
    8: number; // loanIdx
}

export type Pool = {
    address: `0x{string}`;
    info: PoolInfo;
}

export async function getPools(client: PublicClient): Promise<Pool[]> {
    let logs = await client.getLogs({
        event: parseAbiItem('event NewSubPool(address loanCcyToken,address collCcyToken,uint256 loanTenor,uint256 maxLoanPerColl,uint256 r1,uint256 r2,uint256 liquidityBnd1,uint256 liquidityBnd2,uint256 minLoan,uint256 creatorFee,address poolController,uint96 rewardCoefficient)'),
        fromBlock: 'earliest'
    })

    // gather potential pool addresses where controller is our controller
    let potentialPools = logs.filter(x => {
        let chunks = x.data.substring(2).match(/.{1,64}/g)
        if (chunks == null) return false
        // @ts-ignore
        return chunks.length == 12 && chunks[10].endsWith(CHAIN_INFO[chain.id].CONTROLLER.substring(2))
    })

    let controller = getContract({
        // @ts-ignore
        address: CHAIN_INFO[chain.id].CONTROLLER,
        abi: IControllerAbi,
        publicClient: client
    })

    // get whitelist boolean for every pool
    let whitelists = await Promise.all(potentialPools.map(x => {
        return controller.read.poolWhitelisted([x.address]) as Promise<boolean>
    }))

    let pools = potentialPools.filter((pool, index) => whitelists[index]).map(x => getContract({
        address: x.address,
        abi: IPoolAbi,
        publicClient: client
    }))

    // gather infos using contract.getPoolInfo
    let infos = await Promise.all(pools.map(x => {
        return x.read.getPoolInfo() as Promise<PoolInfo>
    }))

    return infos.map((info, index) => {
        return {
            address: pools[index].address as `0x{string}`, // we know this for sure
            info
        }
    })
}
