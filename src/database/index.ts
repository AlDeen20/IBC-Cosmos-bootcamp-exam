import { Knex, knex } from 'knex';
import knexfile from '../../knexfile';

const config: Knex.Config = knexfile;

const db = knex(config);

export default db;
