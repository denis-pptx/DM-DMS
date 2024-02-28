const ApiError = require('../exceptions/api-error');

const adminMiddleware = (req, res, next) => {
    if (!req.user.is_admin) {
        return next(ApiError.Forbidden());
    }

    next();
};

module.exports = adminMiddleware;
