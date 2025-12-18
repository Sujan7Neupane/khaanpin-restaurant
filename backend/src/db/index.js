import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

export const dbConnection = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_Name}`
    );

    console.log(`Connected to MONGODB!`);
    console.log(`\n DB_Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("Connection To MONGODB Failed!", error);
    process.exit(1);
  }
};
