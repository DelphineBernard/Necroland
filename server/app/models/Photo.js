import { Model, DataTypes } from "sequelize";

import sequelize from "../database.js";

class Photo extends Model {}

Photo.init({
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
    attraction_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Photo",
    tableName: "photo"   
});

export default Photo;