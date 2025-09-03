"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const User_Model_1 = require("./../Models/User.Model");
class UserRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(User_Model_1.UserModel);
    }
}
exports.UserRepository = UserRepository;
