import { Model, DataTypes } from "sequelize";

import sequelize from "../database.js";

class Price extends Model {}

Price.init({
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false    
    },
    price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    hotel: {
        type: DataTypes.BOOLEAN,
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
    modelName: "Price",
    tableName: "price"   
});

export default Price;