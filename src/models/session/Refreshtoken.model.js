import { DataTypes } from "sequelize";

export default (sequelize) => {
  const RefreshToken = sequelize.define("RefreshToken", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "refreshTokens",
      timestamps: true,
    }
  );
  return RefreshToken;
};