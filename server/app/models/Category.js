import { Model, DataTypes } from "sequelize";

import sequelize from "../database.js";

class Category extends Model {}

Category.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false    
    },
    slug: {
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
    modelName: "Category",
    tableName: "category"   
});

export default Category;