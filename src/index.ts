import express, { json } from "express";
import { sequelize } from "./sequelize";
import routes from "./routes";
import user from "./routes/user";
import sportrader from "./routes/sportradar";
import betsoft from "./routes/betSoft";
import cors from "cors";

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
app.use("/user", user);

const start = async (): Promise<void> => {
  await sequelize.sync({ force: false });
  try {
    app.listen(4000, () => {
      console.log("Server started on port 4000");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
