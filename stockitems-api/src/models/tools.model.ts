import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const Tools = sequelize.define('tools', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        field: "name",
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "date",
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "count",
        defaultValue: 0,
    },
})