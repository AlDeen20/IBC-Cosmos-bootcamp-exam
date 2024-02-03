#!/usr/bin/env npx ts-node

import { config } from "dotenv"
import getStdin from "../src/stdIn"
import { checkOnStudentsInParallel, NodeConfig } from "../src/studentChecker"
import _ from "../environment"

config()

// Example
// ./script/checkStudents.ts < ./samples/student-infos.json
async function runAll() {
    const config1: NodeConfig = {
        rpc: process.env.RPC_URL,
        channelRange: {
            min: process.env.CHANNEL_ID_MIN,
            max: process.env.CHANNEL_ID_MAX,
        },
    }
    const students = await checkOnStudentsInParallel([config1], JSON.parse(await getStdin()))
    console.log(JSON.stringify(students, null, 4))
}

runAll()
