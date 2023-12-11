const ApiError = require('../exceptions/api-error');

module.exports = function (err, req, res, next) {
    console.error(err);

    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }

    if (err.sql) {
        return res.status(404).json({
            message: err.sqlMessage || '',
            state: err.sqlState || '',
            sql: err.sql
        })
    }

    return res.status(500).json();
};