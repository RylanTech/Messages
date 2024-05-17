import 'dotenv/config'
import { Sequelize } from 'sequelize';
import { userFactory } from './user';

const dbName = process.env.DB_NAME || '';
const username = process.env.DB_USER || '';
const password = process.env.DB_PASS || '';

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

userFactory(sequelize)


export const db = sequelize;