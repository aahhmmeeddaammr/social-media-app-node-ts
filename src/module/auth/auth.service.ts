import type { Response } from "express";
import { ApiResponse } from "../../utils/response/success.response";
import { ICreateUserDto } from "./auth.dto";
import { Request } from "../../utils/types/Request";
import { UserRepository } from "../../DB/Repositories/UserRepository";
import { ConflictRequest } from "../../utils/response/errors.response";
import { IUser } from "../../utils/types/Models";

class AuthService {
  userRepository = new UserRepository();
  constructor() {}

  signup = async (req: Request<ICreateUserDto>, res: Response): Promise<Response> => {
    const checkUser = await this.userRepository.findOne({
      filter: { email: req.body.email },
      opts: {
        select: "email",
      },
    });
    if (checkUser) {
      throw new ConflictRequest("Email already exist");
    }
    const user = await this.userRepository.createOne({ data: req.body as Partial<IUser> });
    return ApiResponse.created(res, user, "User created successfully");
  };
}

export default new AuthService();
