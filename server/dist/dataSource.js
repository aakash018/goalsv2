"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "127.0.0.1",
    username: "dev",
    password: "password",
    database: "goals",
    synchronize: true,
    entities: [User_1.User],
});
