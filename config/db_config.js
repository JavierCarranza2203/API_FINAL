import { createPool } from 'mysql2/promise';

const connectionParams = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 20,
    queueLimit: 4
}

export const pool = createPool(connectionParams);