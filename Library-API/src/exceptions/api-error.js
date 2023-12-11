module.exports = class ApiError {
    constructor(status, message = '', errors = []) {
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, "User unauthorized");
    }

    static Forbidden() {
        return new ApiError(403, "Forbidden");
    }
    
    static BadRequest(message, errors) {
        return new ApiError(404, message, errors);
    }
}