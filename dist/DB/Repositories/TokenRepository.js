"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRepository = void 0;
const Token_model_1 = require("../Models/Token.model");
const BaseRepository_1 = require("./BaseRepository");
class TokenRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Token_model_1.TokenModel);
    }
}
exports.TokenRepository = TokenRepository;
