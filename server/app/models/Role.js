import { Model, DataTypes } from "sequelize";

import sequelize from "../database.js";

class Role extends Model {}

Role.init({
    name: {
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
    modelName: "Role",
    tableName: "role"
});

export default Role;