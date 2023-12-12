const ApiError = require('../exceptions/api-error');
const pool = require('../db/connection-pool');

const BookController = {
    getAll: async (req, res, next) => {
        try {
            const [rows] = await pool.query('SELECT * FROM book');
            res.json(rows);
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        const id = req.params.id;

        try {
            const [rows] = await pool.query('SELECT * FROM book WHERE id = ?', [id]);

            if (!rows.length) {
                return next(ApiError.BadRequest("Book not found"));
            }

            res.status(200).json(rows[0]);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        const { title, description, publication_date, isbn, is_available, publisher_id } = req.body;

        try {
            const query = `
                INSERT INTO book(title, description, publication_date, isbn, is_available, publisher_id)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            await pool.query(query, [title, description, publication_date, isbn, is_available, publisher_id]);

            res.status(201).json({ message: 'Book created successfully' });
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        const id = req.params.id;
        const { title, description, publication_date, isbn, is_available, publisher_id } = req.body;

        try {
            const query = `
                UPDATE book
                SET title = ?, description = ?, publication_date = ?, isbn = ?, is_available = ?, publisher_id = ?
                WHERE id = ?
            `;

            const [result] = await pool.query(query, [title, description, publication_date, isbn, is_available, publisher_id, id]);

            if (!result.affectedRows) {
                return next(ApiError.BadRequest("Book not found"));
            }

            res.status(200).json({ message: 'Book updated successfully' });
        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        const id = req.params.id;

        try {
            const [result] = await pool.query('DELETE FROM book WHERE id = ?', [id]);

            if (!result.affectedRows) {
                return next(ApiError.BadRequest("Book not found"));
            }

            res.status(200).json({ message: 'Book deleted successfully' });
        } catch (e) {
            next(e);
        }
    }
};

module.exports = BookController;
