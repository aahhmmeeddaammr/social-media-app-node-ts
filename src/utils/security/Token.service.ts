import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import { BadRequest, ForbiddenRequest, UnAuthorizedRequest } from "../response/errors.response";
import { UserRepository } from "../../DB/Repositories/UserRepository";
import { TokenRepository } from "../../DB/Repositories/TokenRepository";
export enum signatureEnum {
  bearer = "Bearer",
  system = "System",
}
export enum tokenTypeEnum {
  refresh = "refresh",
  access = "access",
}
export default class TokenSerivce {
  public static generateToken({
    payload,
    secret = String(process.env.ACCESS_USER_TOKEN_SECRETKEY),
    options,
  }: {
    payload: Object;
    secret: string;
    options?: SignOptions;
  }) {
    return jwt.sign(payload, secret, options);
  }

  public static verifyToken({
    token,
    secret = String(process.env.ACCESS_USER_TOKEN_SECRETKEY),
  }: {
    token: string;
    secret: string;
  }): JwtPayload {
    return jwt.verify(token, secret) as JwtPayload;
  }

  public static async decodeToken({
    authorization,
    tokenType = tokenTypeEnum.access,
  }: {
    authorization: string;
    tokenType: tokenTypeEnum;
  }) {
    const userRepo = new UserRepository();
    const tokenRepo = new TokenRepository();
    const [bearer, token] = authorization?.split(" ") || [];

    if (!bearer || !token) {
      throw new UnAuthorizedRequest("Missing or invalid token");
    }
    const signatures = this.getSignatures({ bearer: bearer as signatureEnum });
    try {
      const { userId, jti } = this.verifyToken({
        token,
        secret: (tokenType === tokenTypeEnum.access ? signatures.accessSignature : signatures.refreshSignature) as string,
      });
      if (await tokenRepo.findOne({ filter: { jti } })) {
        throw new ForbiddenRequest("in-valid token");
      }
      const user = await userRepo.findById({
        id: userId,
        opts: {
          select: "-password",
        },
      });
      if (!user) {
        throw new BadRequest("user is deleted");
      }
      return { user, jti };
    } catch (error) {
      throw new ForbiddenRequest("Invalid or expired token");
    }
  }

  private static getSignatures = ({ bearer }: { bearer: signatureEnum }) => {
    const signatures: { accessSignature: undefined | string; refreshSignature: undefined | string } = {
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
