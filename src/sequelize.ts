import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  dialect: "mysql",
  database: "betty_db",
  username: "root",
  password: "",
  host: "localhost",
  port: 3306,
  models: [__dirname + "/models"],
});

const sequelizeTr = async () => await sequelize.transaction();

export { sequelize, sequelizeTr };
