import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing"

export type StudentId = string
export type StudentResult = {
    found: boolean
    channelId?: number
}
export type StudentInfo = {
    studentId: StudentId
    mnemonic: string
    addressRecipient: string
    homeDenom: string
    result: StudentResult
}

export async function studentGenerator(studentIds: StudentId[]): Promise<StudentInfo[]> {
    let index = 0
    const result: StudentInfo[] = []
    while (index < studentIds.length) {
        const wallet: DirectSecp256k1HdWallet = await DirectSecp256k1HdWallet.generate(24)
        const accounts = await wallet.getAccounts()
        result.push({
            studentId: studentIds[index],
            mnemonic: wallet.mnemonic,
            addressRecipient: accounts[0].address,
            homeDenom: accounts[0].address.replace("cosmos", "token"),
            result: { found: false, channelId: undefined },
        })
        index++
    }
    return result
}
