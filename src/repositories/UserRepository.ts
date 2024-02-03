import { Knex } from "knex";
import db from "../database";
import User from "../database/models/User";

export default class UserRepository {
    users: () => Knex.QueryBuilder<User>;

    constructor() {
        this.users = () => db('users');
    }

    getAll(): Promise<User[]> {
        console.log('[UserRepository] get all users');
        return this.users();
    }
}
