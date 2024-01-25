import {parseAbiItem, PublicClient} from "viem";
import {CHAIN_INFO, IEmergencyWithdrawalAbi} from "@/const";
import {multicall} from "@wagmi/core";

// returns undefined in case the user has no escrows approved
export async function getFirstApprovedEscrow(client: PublicClient, chainId: number, user: `0x${string}`, pool: `0x${string}`): Promise<`0x${string}` | undefined> {
    let logs = await client.getLogs({
        event: parseAbiItem('event Approved(address indexed user,address indexed pool, address indexed escrow)'),
        fromBlock: 'earliest',
        args: {
            pool,
            user
        }
    })

    // check if they are still whitelisted
    // use multicall yeah
    let whitelists = await multicall({
        // @ts-ignore
        contracts: logs.map(x => {
            return {
                address: CHAIN_INFO[chainId].CONTROLLER,
                abi: IEmergencyWithdrawalAbi,
                functionName: 'isApproved',
                args: [user, pool, x.args.escrow]
            }
        })
    })

    let pools = logs.filter((log, index) => whitelists[index].result).map(x => x.args.escrow)
    if (pools.length == 0) return undefined
    return pools[0]
}
