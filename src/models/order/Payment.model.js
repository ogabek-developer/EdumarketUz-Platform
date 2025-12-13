import { sequelize } from "../../lib/db.service.js";
import { DataTypes } from "sequelize";

const PaymentModel = sequelize.define("Payment", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    purchase_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("pending", "paid", "canceled"),
        default: "pending"
    },
    transaction_id: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    paid_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    tableName: "payments",
    timestamps: true
});

export default PaymentModel;