"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const Models_1 = require("../../utils/types/Models");
const schema = new mongoose_1.Schema({
    firstName: { type: String, requried: true },
    lastName: { type: String },
    fullName: { type: String },
    email: { type: String },
    gender: { type: String, enum: Models_1.GenderEnum, default: Models_1.GenderEnum.male },
    password: { type: String },
    resetPasswordOtp: { type: String },
    otp: { type: String },
    otpConfirmed: Date,
    address: { type: String },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
schema
    .virtual("userName")
    .set(function (value) {
    const [firstName, lastName] = value.split(" ") || [];
    this.set({ firstName, lastName });
})
    .get(function () {
    return this.get("firstName") + " " + this.get("lastName");
});
exports.UserModel = mongoose_1.models.User || (0, mongoose_1.model)("User", schema);
