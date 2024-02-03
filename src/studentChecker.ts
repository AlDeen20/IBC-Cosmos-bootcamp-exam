import { sha256 } from "@cosmjs/crypto"
import { toAscii, toHex } from "@cosmjs/encoding"
import { Coin, StargateClient } from "@cosmjs/stargate"
import { assert } from "console"
import { StudentInfo, StudentResult } from "./studentGenerator"

export type NodeConfig = {
    rpc: string
    channelRange: {
        min: number
        max: number
    }
}

export type StudentChecker = (info: StudentInfo) => Promise<StudentResult>
export type StudentsChecker = (config: NodeConfig, infos: StudentInfo[]) => Promise<StudentInfo[]>

export const checkOnStudent = async (config: NodeConfig): Promise<StudentChecker> => {
    const client: StargateClient = await StargateClient.connect(config.rpc)
    return async (info: StudentInfo): Promise<StudentResult> => {
        if (info.result.found) return info.result
        const coins: readonly Coin[] = await client.getAllBalances(info.addressRecipient)
        const ibcDenoms: string[] = coins
            .filter((coin: Coin) => 0 < parseInt(coin.amount, 10))
            .map((coin: Coin) => coin.denom.toLowerCase())
            .filter((denom: string) => denom.startsWith("ibc/"))
        const results: StudentResult[] = ibcDenoms.map((denom: string) => {
            let channelId: number = config.channelRange.min
            do {
                const hash: Uint8Array = sha256(toAscii(`transfer/channel-${channelId}/${info.homeDenom}`))
                if (denom == `ibc/${toHex(hash)}`)
                    return {
                        found: true,
                        channelId: channelId,
                    }
            } while (++channelId <= config.channelRange.max)
            return {
                found: false,
                channelId: undefined,
            }
        })
        return (
            results.find((result: StudentResult) => result.found) || {
                found: false,
                channelId: undefined,
            }
        )
    }
}

export const checkOnStudents = async (config: NodeConfig, infos: StudentInfo[]): Promise<StudentInfo[]> => {
    const checker: StudentChecker = await checkOnStudent(config)
    const results: StudentInfo[] = []
    let index = 0
    while (index < infos.length) {
        const result = await checker(infos[index])
        results.push(
            Object.assign<StudentInfo, StudentInfo, Partial<StudentInfo>>({} as StudentInfo, infos[index], {
                result: result,
            }),
        )
        index++
    }
    return results
}

export const checkOnStudentsInParallel = async (
    configs: NodeConfig[],
    infos: StudentInfo[],
): Promise<StudentInfo[]> => {
    const chunkSize = Math.ceil(infos.length / configs.length)
    const filedInfos: StudentInfo[][] = []
    for (let index = 0; index < infos.length; index += chunkSize) {
        filedInfos.push(infos.slice(index, index + chunkSize))
    }
    assert(filedInfos.length == configs.length)

    const checkers: Promise<StudentInfo[]>[] = configs.map((config: NodeConfig, index: number) =>
        checkOnStudents(config, filedInfos[index]),
    )
    const results: StudentInfo[][] = await Promise.all(checkers)
    return results.flat()
}
