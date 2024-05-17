import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class user extends Model<InferAttributes<user>, InferCreationAttributes<user>>{
    declare userId: number;
    declare username: string;
    declare displayName: string;
    declare password: string;
    declare preferenceColor: string;
}

export function userFactory(sequelize: Sequelize) {
    user.init({
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        displayName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        preferenceColor: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
        {
            freezeTableName: true,
            tableName: 'users',
            sequelize,
            collate: 'utf8_general_ci',
        })
}