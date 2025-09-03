import { Types } from "mongoose";

export enum GenderEnum {
  male = "Male",
  female = "Female",
}

export interface IUser {
  firstName: string;
  lastName: string;
  fullName?: string;

  email: string;
  gender: GenderEnum;

  password: string;
  resetPasswordOtp?: string;

  otp?: string;
  otpConfirmed: Date;

  address?: string;
}

export interface IToken {
  jti: string;
  ownerBy: Types.ObjectId;
  expiresIn: number;
}
