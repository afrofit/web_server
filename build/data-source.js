"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mongodb",
    url: process.env.MONGO_URL,
    synchronize: false,
    logging: false,
    entities: ["build/entity/**/*.js"],
    migrations: ["build/migrations/**/*.js"],
    subscribers: ["build/subscribers/**/*.js"],
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
//# sourceMappingURL=data-source.js.map