import { HydratedDocument, model, models, Schema } from "mongoose";
import { IToken } from "../../utils/types/Models";

const schema = new Schema<IToken>(
  {
    jti: { type: String, required: true },
    expiresIn: { type: Number, required: true },
    ownerBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const TokenModel = models.Token || model<IToken>("Token", schema);

export type HToken = HydratedDocument<IToken>;
