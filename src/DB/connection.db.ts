import { connect } from "mongoose";
import { UserModel } from "./Models/User.Model";

export const connectDB = async () => {
  try {
    const { models } = await connect(process.env.DB_URI as string);
    await UserModel.syncIndexes();
    console.log(models);
    console.log("Connected to db successfully");
  } catch (error) {
    console.log("failed to connect db");
    console.log(error);
  }
};
