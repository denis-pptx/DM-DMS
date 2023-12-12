const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const pool = require('../db/connection-pool');

const AuthController = {
    register: async (req, res, next) => {
        try {
            const { username, password, email } = req.body;

            await pool.query('CALL CreateUser(?, ?, ?, 1, 0)', [username, password, email]);

            res.status(201).json({ message: 'Registration successful' });
        } catch (e) {
            next(e);
        }
    },

    login: async (req, res, next) => {
        try {
            const { username, password } = req.body;

            const query = `
                SELECT *
                FROM user
                WHERE username = ?
            `;

            const [rows] = await pool.query(query, [username]);
            const user = rows[0];

            if (!user || user.password !== crypto.createHash('sha256').update(password).digest('hex')) {
                return res.status(401).json({ error: 'Invalid login or password' });
            }

            const payload = {
                id: user.id,
                username: user.username,
                is_admin: user.is_admin
            }

            const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '30d' });

            res.status(200).json({ token, user: payload });
        } catch (e) {
            next(e);
        }
    }
};

module.exports = AuthController;
