import { BaseRepository } from "./BaseRepository";
import { UserModel } from "./../Models/User.Model";
import { IUser } from "../../utils/types/Models";

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(UserModel);
  }
}
