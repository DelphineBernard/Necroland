import { Model, DataTypes } from "sequelize";

import sequelize from "../database.js";

class Message extends Model {}

Message.init({
    object: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    lastname: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    firstname: {
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
    status_id: {
        type: DataTypes.INTEGER,
        defaultValue: 3,
        allowNull: false
    },
}, {
    sequelize,
    modelName: "Message",
    tableName: "message"
});

export default Message;
