import { Knex, knex } from "knex";
import db from "../database";
import HackerrankTest from "../database/models/HackerrankTest";

export default class HackerrankTestRepository {
    hackerrankTests: () => Knex.QueryBuilder<HackerrankTest>;

    constructor() {
        this.hackerrankTests = () => db('hackerrank_tests');
    }

    create(testName: string, hackerrankId: string, dueDate?: string): Promise<number> {
        console.log('[HackerrankTestRepository] create hackerrank test with hackerrank id ' + hackerrankId);
        const data: any = {
            test_name: testName,
            hackerrank_id: hackerrankId,
            created_at: new Date(),
            updated_at: new Date()
        }
        if (dueDate) data.dueDate = new Date(dueDate);
        return this.hackerrankTests().insert(data);
    }

    getByHackerrankId(id: string): Promise<HackerrankTest> {
        console.log('[HackerrankTestRepository] get hackerrank test by hackerrank id ' + id);
        return this.hackerrankTests()
            .where('hackerrank_id', id)
            .first()
            .then(data => data ? new HackerrankTest(data.test_id, data.test_name, data.hackerrank_id, data.due_date) : null);
    }
}
