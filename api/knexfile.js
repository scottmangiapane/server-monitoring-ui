require('dotenv').config();

module.exports = {
    client: 'pg',
    connection: {
        host: 'postgres',
        port: '5432',
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        charset: 'utf8'
    }
};