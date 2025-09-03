import express, { type Response, type Request } from "express";
import { configDotenv } from "dotenv";
import cros from "cors";
import authController from "./module/auth/auth.controller";
import { globalErrorHandler } from "./utils/response/errors.response";
import { ApiResponse } from "./utils/response/success.response";
import { connectDB } from "./DB/connection.db";
import morgan from "morgan";
export const bootstrap = async () => {
  configDotenv();
  const app = express();
  const PORT = process.env.PORT || 3000;
  const API_PREFIX = process.env.API_PREFIX || "/api/v1";
  app.use(cros());
  app.use(express.json());
  app.use(morgan("dev"));
  await connectDB();

  app.get(API_PREFIX + "/", (req: Request, res: Response) => {
    return ApiResponse.ok(res, { message: "Welcome in social media app" });
  });

  app.use(API_PREFIX + "/auth", authController);

  app.use("{/*dummy}", (req: Request, res: Response) => {
    return res.status(404).json({ message: "invalid request method or url" });
  });
  app.use(globalErrorHandler);
  app.listen(PORT, () => {
    console.log(`Server running on port ::: ${PORT}`);
  });
};
