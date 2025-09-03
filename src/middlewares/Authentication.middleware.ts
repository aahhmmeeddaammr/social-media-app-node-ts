import { type NextFunction, type Response } from "express";
import TokenSerivce, { tokenTypeEnum } from "../utils/security/Token.service";
import { type Request } from "../utils/types/Request";
import { UnAuthorizedRequest } from "../utils/response/errors.response";

export const Authentication = ({ tokenType = tokenTypeEnum.access }: { tokenType?: tokenTypeEnum }) => {
  return async (req: Request, _: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
      throw new UnAuthorizedRequest("Missing token header");
    }
    const { jti, user } = await TokenSerivce.decodeToken({ authorization: req.headers.authorization, tokenType });
    req.user = user;
    req.jti = jti as string;
    next();
  };
};
