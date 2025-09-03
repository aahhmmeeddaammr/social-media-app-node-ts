import { HydratedDocument, model, models, Schema } from "mongoose";
import { GenderEnum, IUser } from "../../utils/types/Models";

const schema = new Schema<IUser>(
  {
    firstName: { type: String, requried: true },
    lastName: { type: String },
    fullName: { type: String },

    email: { type: String },
    gender: { type: String, enum: GenderEnum, default: GenderEnum.male },

    password: { type: String },
    resetPasswordOtp: { type: String },

    otp: { type: String },
    otpConfirmed: Date,

    address: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

schema
  .virtual("userName")
  .set(function (value: string) {
    const [firstName, lastName] = value.split(" ") || [];
    this.set({ firstName, lastName });
  })
  .get(function () {
    return this.get("firstName") + " " + this.get("lastName");
  });

export const UserModel = models.User || model<IUser>("User", schema);
export type HUser = HydratedDocument<IUser>;
