
import { DataTypes } from "sequelize";
import { sequelize } from "../../lib/db.service.js";

const PurchaseModel = sequelize.define("Purchase", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    purchase_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    tableName: "purchases",
    timestamps: true
});

export default PurchaseModel;


