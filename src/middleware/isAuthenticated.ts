import { Op } from "sequelize";
import { verify } from "jsonwebtoken";
import { ErrorHandler } from "./errorHandler";

export const isAuthenticated = async (mainToken: string | null) => {
  try {
    if (!mainToken) {
      return null;
    }

    const authToken = mainToken.split(" ")[1];
    const secret = `${process.env.SECRET_KEY}`;

    if (!mainToken) {
      throw new ErrorHandler("User not authorized", 403);
    }
  } catch (err) {
    console.error("Error decoding token", err);
    return null;
  }
};
