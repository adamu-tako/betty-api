import express, { json } from "express";
import { sequelize } from "./sequelize";
import routes from "./routes";
import user from "./routes/user";
import sportrader from "./routes/sportradar";
import betsoft from "./routes/betSoft";
import binance from "./routes/binance";
import { serverIO } from "./routes/binanceSocket";
import cors from "cors";
import mongoose from "mongoose";
import dontenv from "dotenv";
import { client } from "./binance";
import { createServer } from "http";

dontenv.config();
const DB_URL = process.env.MONGO_DB_URL;

const app = express();
app.use(json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(
  cors({
    origin: "*",
  })
);

app.use("/", routes);
app.use("/", sportrader);
app.use("/", betsoft);
app.use("/", binance);
app.use("/user", user);

const httpServer = createServer(app);
serverIO.attach(httpServer);

const start = async (): Promise<void> => {
  try {
    await mongoose
      .connect(DB_URL as string)
      .then(() => console.log("Connected to mongoDb server"))
      .catch((err) => console.log(err));
    httpServer.listen(4000, () => {
      console.log("Server started on port 4000");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
