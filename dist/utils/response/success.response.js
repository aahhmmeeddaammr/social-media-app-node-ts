"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    status;
    message;
    data;
    timestamp;
    constructor(status, message, data = null) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.timestamp = new Date().toISOString();
    }
    toJSON() {
        return {
            timestamp: this.timestamp,
            status: this.status,
            message: this.message,
            data: this.data,
        };
    }
    send(res) {
        return res.status(this.status).json(this.toJSON());
    }
    static ok(res, data, message = "OK") {
        return new ApiResponse(200, message, data).send(res);
    }
    static created(res, data, message = "Created") {
        return new ApiResponse(201, message, data).send(res);
    }
    static noContent(res, message = "No Content") {
        return new ApiResponse(204, message, null).send(res);
    }
    static error(res, error) {
        return new ApiResponse(error.statusCode || 500, error.message, error.cause).send(res);
    }
}
exports.ApiResponse = ApiResponse;
