import "reflect-metadata";
import { DataSource } from "typeorm";

// export const AppDataSource = new DataSource({
//   type: "mongodb",
//   database: "afrofit",
//   synchronize: false,
//   logging: false,
//   entities: ["build/entity/**/*.js"],
//   migrations: ["build/migrations/**/*.js"],
//   subscribers: ["build/subscribers/**/*.js"],
//   port: 27017,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   // dropSchema: true,
// });

export const AppDataSource = new DataSource({
  type: "mongodb",
  database: process.env.MONGO_DATABASE,
  host: process.env.MONGO_HOST,
  username: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
  synchronize: false,
  logging: false,
  entities: ["build/entity/**/*.js"],
  migrations: ["build/migrations/**/*.js"],
  subscribers: ["build/subscribers/**/*.js"],
  port: 27017,
  useNewUrlParser: true,
  useUnifiedTopology: true,

  // dropSchema: true,
});
