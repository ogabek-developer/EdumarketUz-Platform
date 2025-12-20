import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Notification = sequelize.define("Notification", {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        sender_type: {
            type: DataTypes.ENUM(["admin", "instructor"]),
            allowNull: false,
        },
        sender_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        receiver_type: {
            type: DataTypes.ENUM(["admin", "instructor", "student"]),
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM(["order", "payment", "course", "system", "admin"]),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        tableName: "notifications",
        timestamps: true
    });

    return Notification;
};
