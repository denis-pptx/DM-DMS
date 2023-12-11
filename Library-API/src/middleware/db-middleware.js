const mysql = require('mysql2/promise');

module.exports = async (req, res, next) => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT
        });

        console.log('Successfully connected to the database');

        req.db = connection;
        next();
    } catch (error) {
        console.error('Error db connection:', error);
        res.status(500);
    }
}