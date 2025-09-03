"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = require("mongoose");
const User_Model_1 = require("./Models/User.Model");
const connectDB = async () => {
    try {
        const { models } = await (0, mongoose_1.connect)(process.env.DB_URI);
        await User_Model_1.UserModel.syncIndexes();
        console.log(models);
        console.log("Connected to db successfully");
    }
    catch (error) {
        console.log("failed to connect db");
        console.log(error);
    }
};
exports.connectDB = connectDB;
