import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "./success.response";

export interface IError extends Error {
  statusCode: number;
}

class AppError extends Error {
  constructor(public override message: string, public statusCode: number, info?: unknown) {
    super();
    this.cause = info;
    this.name = this.constructor.name;
  }
}

export class BadRequest extends AppError {
  constructor(message: string, info?: unknown) {
    super(message, 400, info);
  }
}

export class ConflictRequest extends AppError {
  constructor(message: string, info?: unknown) {
    super(message, 409, info);
  }
}

export class NotFoundRequest extends AppError {
  constructor(message: string, info?: unknown) {
    super(message, 404, info);
  }
}
export class UnAuthorizedRequest extends AppError {
  constructor(message: string, info?: unknown) {
    super(message, 401, info);
  }
}
export class ForbiddenRequest extends AppError {
  constructor(message: string, info?: unknown) {
    super(message, 403, info);
  }
}

export const globalErrorHandler = (error: IError, req: Request, res: Response, next: NextFunction) => {
  return ApiResponse.error(res, error);
};
