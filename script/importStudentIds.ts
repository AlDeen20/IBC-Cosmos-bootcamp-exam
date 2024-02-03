#!/usr/bin/env npx ts-node

import getStdin from "../src/stdIn"
import { StudentId } from "../src/studentGenerator"

// Example
// ./script/importStudents.ts < ./samples/student-ids.csv
async function runAll() {
    const ids: string = await getStdin()
    const rows: string[] = ids.split("\n")
    const extracted: StudentId[] = rows
        .filter((row: string) => row != "")
        .map((row: string) => {
            const values: string[] = row.split(",")
            return values[0]
        })
    console.log(JSON.stringify(extracted, null, 4))
}

runAll()
