import { Model, DataTypes } from "sequelize";

import sequelize from "../database.js";

class Reservation extends Model {}

Reservation.init({
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    nb_people: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    hotel: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
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
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    },
}, {
    sequelize,
    modelName: "Reservation",
    tableName: "reservation"
});

export default Reservation;