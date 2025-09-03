"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const auth_controller_1 = __importDefault(require("./module/auth/auth.controller"));
const errors_response_1 = require("./utils/response/errors.response");
const success_response_1 = require("./utils/response/success.response");
const connection_db_1 = require("./DB/connection.db");
const morgan_1 = __importDefault(require("morgan"));
const bootstrap = async () => {
    (0, dotenv_1.configDotenv)();
    const app = (0, express_1.default)();
    const PORT = process.env.PORT || 3000;
    const API_PREFIX = process.env.API_PREFIX || "/api/v1";
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use((0, morgan_1.default)("dev"));
    await (0, connection_db_1.connectDB)();
    app.get(API_PREFIX + "/", (req, res) => {
        return success_response_1.ApiResponse.ok(res, { message: "Welcome in social media app" });
    });
    app.use(API_PREFIX + "/auth", auth_controller_1.default);
    app.use("{/*dummy}", (req, res) => {
        return res.status(404).json({ message: "invalid request method or url" });
    });
    app.use(errors_response_1.globalErrorHandler);
    app.listen(PORT, () => {
        console.log(`Server running on port ::: ${PORT}`);
    });
};
exports.bootstrap = bootstrap;
