import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mongodb",
  database: "afrofit",
  synchronize: false,
  logging: false,
  entities: ["build/entity/**/*.js"],
  migrations: ["build/migrations/**/*.js"],
  subscribers: ["build/subscribers/**/*.js"],
  port: 27017,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dropSchema: true,
});
