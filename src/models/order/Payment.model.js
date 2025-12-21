import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Payment = sequelize.define("Payment", {
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
        default: "pending",
      },
      transaction_id: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      paid_at: {
        type: DataTypes.DATE,
        
      },
    },
    {
      tableName: "payments",
      timestamps: true,
    }
  );
  return Payment;
};