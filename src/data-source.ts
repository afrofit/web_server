import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mongodb",
  // url: process.env.MONGO_URL,
  synchronize: false,
  logging: false,
  entities: ["build/entity/**/*.js"],
  migrations: ["build/migrations/**/*.js"],
  subscribers: ["build/subscribers/**/*.js"],
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
