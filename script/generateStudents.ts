#!/usr/bin/env npx ts-node

import getStdin from "../src/stdIn"
import { studentGenerator } from "../src/studentGenerator"

// Example
// ./script/generateStudents.ts < ./samples/student-ids.json
async function runAll() {
    const students = await studentGenerator(JSON.parse(await getStdin()))
    console.log(JSON.stringify(students, null, 4))
}

runAll()
