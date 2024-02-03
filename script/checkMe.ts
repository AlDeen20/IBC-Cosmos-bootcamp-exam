#!/usr/bin/env npx ts-node

import { existsSync } from "fs"
import { config } from "dotenv"
import path from "path"
import { checkOnStudent, NodeConfig, StudentChecker } from "../src/studentChecker"
import { StudentResult } from "../src/studentGenerator"
import _ from "../environment"

if (process.argv.length < 4) {
    throw new Error(`Usage: npx ts-node ${path.basename(__filename)} homeToken testnetRecipient`)
}
const [, , homeDenom, recipient] = process.argv
const colors = {
    green: "\x1b[32m",
    red: "\x1b[31m",
    reset: "\x1b[0m",
}

// Example
// ./script/checkMe.ts token cosmos1m5gjpnm6fjljvxfktjkvjumk79xdrckmrckypk
async function runAll() {
    if (!existsSync(`${__dirname}/../.env`)) {
        throw new Error("Missing .env file. Create it. See sample.")
    }
    config()
    const config1: NodeConfig = {
        rpc: process.env.RPC_URL,
        channelRange: {
            min: process.env.CHANNEL_ID_MIN,
            max: process.env.CHANNEL_ID_MAX,
        },
    }
    const checker: StudentChecker = await checkOnStudent(config1)
    const myResult: StudentResult = await checker({
        studentId: "me",
        mnemonic: "",
        homeDenom: homeDenom,
        addressRecipient: recipient,
        result: { found: false, channelId: undefined },
    })
    console.log(
        myResult.found
            ? `${colors.green}Found it at channel ${myResult.channelId}!`
            : `${colors.red}Not found`,
        colors.reset,
    )
}

runAll()
