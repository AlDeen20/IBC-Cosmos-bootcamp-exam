export default class TestResult {
    testResultId: number;
    userId: number;
    testId: number;
    testResult: number;
    date: Date;

    constructor(
        testResultId: number,
        userId: number,
        testId: number,
        testResult: number,
        date: Date
    ) {
        this.testResultId = testResultId;
        this.userId = userId;
        this.testId = testId;
        this.testResult = testResult;
        this.date = date;
    }
}
