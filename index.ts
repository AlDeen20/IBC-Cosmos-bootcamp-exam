import HackerrankTestRepository from "./src/repositories/HackerrankTestRepository";
import TestResultRepository from "./src/repositories/TestResultRepository";
import UserRepository from "./src/repositories/UserRepository";
import ExamExerciseHandler from "./src/services/ExamExerciseHandler";
import * as dotenv from "dotenv";
dotenv.config();

const config = {
    examExercise: {
        id: process.env.EXAM_EXERCISE_TEST_ID || 'exam-exercise-ida-c-2',
        name: process.env.EXAM_EXERCISE_TEST_NAME || 'Exam exercise C2',
        dueDate: process.env.EXAM_EXERCISE_TEST_DUE_DATE
    },
    nodeConfig: {
        rpc: process.env.RPC_URL,
        channelRange: {
            min: +process.env.CHANNEL_ID_MIN,
            max: +process.env.CHANNEL_ID_MAX
        }
    }
}
const userRepository = new UserRepository();
const hackerrankTestRepository = new HackerrankTestRepository();
const testResultRepository = new TestResultRepository();
const examExerciseHandler = new ExamExerciseHandler(config, userRepository, hackerrankTestRepository, testResultRepository);

const errorHandler = (error: Error) => {
    return {
        statusCode: 500,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ name: error.name, message: error.message })
    }
}

const successHandler = () => {
    return {
        statusCode: 200,
        headers: { "Access-Control-Allow-Origin": "*" }
    }
}

export const handler = async (event: any, context: any) => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);
    return examExerciseHandler.updateExamExerciseState().catch(errorHandler).then(successHandler);
}
