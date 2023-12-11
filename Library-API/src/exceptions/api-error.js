module.exports = class ApiError {
    constructor(status, message = '', errors = []) {
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, "User unauthorized");
    }

    static BadRequest(message, errors) {
        return new ApiError(404, message, errors);
    }
}