"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = exports.ForbiddenRequest = exports.UnAuthorizedRequest = exports.NotFoundRequest = exports.ConflictRequest = exports.BadRequest = void 0;
const success_response_1 = require("./success.response");
class AppError extends Error {
    message;
    statusCode;
    constructor(message, statusCode, info) {
        super();
        this.message = message;
        this.statusCode = statusCode;
        this.cause = info;
        this.name = this.constructor.name;
    }
}
class BadRequest extends AppError {
    constructor(message, info) {
        super(message, 400, info);
    }
}
exports.BadRequest = BadRequest;
class ConflictRequest extends AppError {
    constructor(message, info) {
        super(message, 409, info);
    }
}
exports.ConflictRequest = ConflictRequest;
class NotFoundRequest extends AppError {
    constructor(message, info) {
        super(message, 404, info);
    }
}
exports.NotFoundRequest = NotFoundRequest;
class UnAuthorizedRequest extends AppError {
    constructor(message, info) {
        super(message, 401, info);
    }
}
exports.UnAuthorizedRequest = UnAuthorizedRequest;
class ForbiddenRequest extends AppError {
    constructor(message, info) {
        super(message, 403, info);
    }
}
exports.ForbiddenRequest = ForbiddenRequest;
const globalErrorHandler = (error, req, res, next) => {
    return success_response_1.ApiResponse.error(res, error);
};
exports.globalErrorHandler = globalErrorHandler;
