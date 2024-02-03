#!/usr/bin/env npx ts-node

import { toAscii, toHex } from "@cosmjs/encoding"
import { sha256 } from "@cosmjs/crypto"

let runCount = 10_000
const beforeMilliSec = new Date().getTime()

do {
    const hash = toHex(sha256(toAscii(`transfer/channel-${runCount}/token`)))
    // console.log(hash)
} while (0 < --runCount)

const afterMilliSec = new Date().getTime()
const durationMilliSec = afterMilliSec - beforeMilliSec

console.log("Took", durationMilliSec / 1000, "seconds")
