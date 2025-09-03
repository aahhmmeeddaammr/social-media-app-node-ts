import { Request as ExReq } from "express";
import { IUser } from "./Models";

export type Request<TBody = {}, TParams = {}, TQuery = {}> = ExReq<TParams, any, TBody, TQuery> & {
  user?: IUser;
  jti?: string;
};
