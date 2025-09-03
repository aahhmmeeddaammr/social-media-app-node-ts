import { Response } from "express";
import { IError } from "./errors.response";

export class ApiResponse<T> {
  timestamp: string;
  constructor(public status: number, public message: string, public data: T | null = null) {
    this.timestamp = new Date().toISOString();
  }

  toJSON() {
    return {
      timestamp: this.timestamp,
      status: this.status,
      message: this.message,
      data: this.data,
    };
  }

  send(res: Response): Response {
    return res.status(this.status).json(this.toJSON());
  }

  static ok<T>(res: Response, data: T, message = "OK"): Response {
    return new ApiResponse<T>(200, message, data).send(res);
  }

  static created<T>(res: Response, data: T, message = "Created"): Response {
    return new ApiResponse<T>(201, message, data).send(res);
  }

  static noContent(res: Response, message = "No Content"): Response {
    return new ApiResponse<null>(204, message, null).send(res);
  }

  static error(res: Response, error: IError): Response {
    return new ApiResponse(error.statusCode || 500, error.message, error.cause).send(res);
  }
}
