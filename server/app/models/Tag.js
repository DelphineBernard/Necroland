import { Model, DataTypes } from "sequelize";

import sequelize from "../database.js";

class Tag extends Model {}

Tag.init({
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
    modelName: "Tag",
    tableName: "tag"   
});

export default Tag;