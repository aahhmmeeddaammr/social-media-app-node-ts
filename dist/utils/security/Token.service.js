"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenTypeEnum = exports.signatureEnum = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_response_1 = require("../response/errors.response");
const UserRepository_1 = require("../../DB/Repositories/UserRepository");
const TokenRepository_1 = require("../../DB/Repositories/TokenRepository");
var signatureEnum;
(function (signatureEnum) {
    signatureEnum["bearer"] = "Bearer";
    signatureEnum["system"] = "System";
})(signatureEnum || (exports.signatureEnum = signatureEnum = {}));
var tokenTypeEnum;
(function (tokenTypeEnum) {
    tokenTypeEnum["refresh"] = "refresh";
    tokenTypeEnum["access"] = "access";
})(tokenTypeEnum || (exports.tokenTypeEnum = tokenTypeEnum = {}));
class TokenSerivce {
    static generateToken({ payload, secret = String(process.env.ACCESS_USER_TOKEN_SECRETKEY), options, }) {
        return jsonwebtoken_1.default.sign(payload, secret, options);
    }
    static verifyToken({ token, secret = String(process.env.ACCESS_USER_TOKEN_SECRETKEY), }) {
        return jsonwebtoken_1.default.verify(token, secret);
    }
    static async decodeToken({ authorization, tokenType = tokenTypeEnum.access, }) {
        const userRepo = new UserRepository_1.UserRepository();
        const tokenRepo = new TokenRepository_1.TokenRepository();
        const [bearer, token] = authorization?.split(" ") || [];
        if (!bearer || !token) {
            throw new errors_response_1.UnAuthorizedRequest("Missing or invalid token");
        }
        const signatures = this.getSignatures({ bearer: bearer });
        try {
            const { userId, jti } = this.verifyToken({
                token,
                secret: (tokenType === tokenTypeEnum.access ? signatures.accessSignature : signatures.refreshSignature),
            });
            if (await tokenRepo.findOne({ filter: { jti } })) {
                throw new errors_response_1.ForbiddenRequest("in-valid token");
            }
            const user = await userRepo.findById({
                id: userId,
                opts: {
                    select: "-password",
                },
            });
            if (!user) {
                throw new errors_response_1.BadRequest("user is deleted");
            }
            return { user, jti };
        }
        catch (error) {
            throw new errors_response_1.ForbiddenRequest("Invalid or expired token");
        }
    }
    static getSignatures = ({ bearer }) => {
        const signatures = {
            accessSignature: undefined,
            refreshSignature: undefined,
        };
        switch (bearer) {
            case signatureEnum.system:
                signatures.accessSignature = process.env.ACCESS_SYSTEM_TOKEN_SECRETKEY;
                signatures.refreshSignature = process.env.REFRESH_SYSTEM_TOKEN_SECRETKEY;
                break;
            default:
                signatures.accessSignature = process.env.ACCESS_USER_TOKEN_SECRETKEY;
                signatures.refreshSignature = process.env.REFRESH_USER_TOKEN_SECRETKEY;
                break;
        }
        return signatures;
    };
}
exports.default = TokenSerivce;
