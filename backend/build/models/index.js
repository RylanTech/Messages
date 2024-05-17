"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
require("dotenv/config");
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
const dbName = process.env.DB_NAME || '';
const username = process.env.DB_USER || '';
const password = process.env.DB_PASS || '';
const sequelize = new sequelize_1.Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});
(0, user_1.userFactory)(sequelize);
exports.db = sequelize;
