"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const errors_response_1 = require("../utils/response/errors.response");
const validation = (schema) => {
    return (req, res, next) => {
        const errors = [];
        for (const [key, zodSchema] of Object.entries(schema)) {
            const result = zodSchema.safeParse(req[key]);
            if (!result.success) {
                errors.push(...result.error.issues.map((issue) => ({
                    path: issue.path.join("."),
                    message: issue.message,
                })));
            }
        }
        if (errors.length) {
            throw new errors_response_1.BadRequest("in-valid input data", errors.flat());
        }
        next();
    };
};
exports.validation = validation;
