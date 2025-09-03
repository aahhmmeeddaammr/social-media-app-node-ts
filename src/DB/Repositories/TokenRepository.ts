import { IToken } from "../../utils/types/Models";
import { TokenModel } from "../Models/Token.model";
import { BaseRepository } from "./BaseRepository";

export class TokenRepository extends BaseRepository<IToken> {
  constructor() {
    super(TokenModel);
  }
}
