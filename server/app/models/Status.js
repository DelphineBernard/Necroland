import { Model, DataTypes } from "sequelize";

import sequelize from "../database.js";

class Status extends Model {}

Status.init({
    label: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
}, {
    sequelize,
    modelName: "Status",
    tableName: "status"
});

export default Status;