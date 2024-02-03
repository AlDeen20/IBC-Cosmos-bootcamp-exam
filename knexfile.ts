import * as dotenv from "dotenv";
dotenv.config();

export default {
    client: process.env.DATABASE_DIALECT,
    connection: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT || '5432'),
        database: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD
    },
    pool: {
        min: parseInt(process.env.DATABASE_POOL_MIN || '0'),
        max: parseInt(process.env.DATABASE_POOL_MAX || '9')
    }
}
