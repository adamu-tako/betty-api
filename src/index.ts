import express, { json } from "express";
import { sequelize } from "./sequelize";
import routes from "./routes";
import user from "./routes/user";
import sportrader from "./routes/sportradar";
import betsoft from "./routes/betSoft";
import binance from "./routes/binance";
import cors from "cors";
import mongoose from "mongoose";
import sports from "./model/league";

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

const start = async (): Promise<void> => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://amusatako:CXlogiRIv6K8mICM@cluster0.zic2ust.mongodb.net/?retryWrites=true&w=majority"
      )
      .then(() => console.log("Connect to mongoDb server"))
      .catch((err) => console.log(err));
    app.listen(4000, () => {
      console.log("Server started on port 4000");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
