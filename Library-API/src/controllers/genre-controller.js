const ApiError = require('../exceptions/api-error');

const GenreController = {
    getAll: async (req, res, next) => {
        try {
            const [rows] = await req.db.query('SELECT * FROM genre');
            res.json(rows);
        } catch (e) {
            return next(e)
        } finally {
            req.db && req.db.end();
        }
    },

    getById: async (req, res, next) => {
        const id = req.params.id;

        try {
            const [rows] = await req.db.query('SELECT * FROM genre WHERE id = ?', [id]);

            if (!rows.length) {
                return next(ApiError.BadRequest("Genre not found"));
            }

            res.status(200).json(rows[0]);
        } catch (e) {
            return next(e);
        } finally {
            req.db && req.db.end();
        }
    },

    create: async (req, res, next) => {
        const { name } = req.body;
        try {
            const [result] = await req.db.query('INSERT INTO genre (name) VALUES (?)', [name]);
            res.status(201);
        } catch (e) {
            return next(e);
        } finally {
            req.db && req.db.end();
        }
    },

    update: async (req, res, next) => {
        const id = req.params.id;
        const { name } = req.body;

        try {
            const [result] = await req.db.query('UPDATE genre SET name = ? WHERE id = ?', [name, id]);

            if (!result.affectedRows) {
                return next(ApiError.BadRequest("Genre not found"));
            }

            res.status(200).json({message: 'Genre updated successfully'});
        } catch (e) {
            return next(e);
        } finally {
            req.db && req.db.end();
        }
    },

    delete: async (req, res, next) => {
        const id = req.params.id;

        try {
            const [result] = await req.db.query('DELETE FROM genre WHERE id = ?', [id]);
            
            if (!result.affectedRows) {
                return next(ApiError.BadRequest("Genre not found"));
            }

            res.status(200).json({message: 'Genre deleted successfully'});
        } catch (e) {
            return next(e);
        } finally {
            req.db && req.db.end();
        }
    }
};

module.exports = GenreController;
