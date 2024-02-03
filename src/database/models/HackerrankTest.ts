export default class HackerrankTest {
    testId: number;
    testName: string;
    hackerrankId: string;
    dueDate: Date;

    constructor(
        testId: number,
        testName: string,
        hackerrankId: string,
        dueDate: Date
    ) {
        this.testId = testId;
        this.testName = testName;
        this.hackerrankId = hackerrankId;
        this.dueDate = dueDate;
    }
}
