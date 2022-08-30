"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
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
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mongodb",
    url: process.env.MONGO_URL,
    // database: process.env.MONGO_DATABASE,
    // host: process.env.MONGO_HOST,
    // username: process.env.MONGO_USERNAME,
    // password: process.env.MONGO_PASSWORD,
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
//# sourceMappingURL=data-source.js.map