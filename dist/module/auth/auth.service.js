"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const success_response_1 = require("../../utils/response/success.response");
const UserRepository_1 = require("../../DB/Repositories/UserRepository");
const errors_response_1 = require("../../utils/response/errors.response");
class AuthService {
    userRepository = new UserRepository_1.UserRepository();
    constructor() { }
    signup = async (req, res) => {
        const checkUser = await this.userRepository.findOne({
            filter: { email: req.body.email },
            opts: {
                select: "email",
            },
        });
        if (checkUser) {
            throw new errors_response_1.ConflictRequest("Email already exist");
        }
        const user = await this.userRepository.createOne({ data: req.body });
        return success_response_1.ApiResponse.created(res, user, "User created successfully");
    };
}
exports.default = new AuthService();
