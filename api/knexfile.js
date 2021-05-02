require('dotenv').config();

module.exports = {
    client: 'pg',
    connection: {
        charset: 'utf8',
        database: 'postgres',
        host: 'postgres',
        port: '5432',
        user: 'postgres',
        password: process.env.POSTGRES_PASSWORD
    }
};