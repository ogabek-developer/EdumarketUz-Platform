import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Admin = sequelize.define("Admin", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_super: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "admins",
      timestamps: true,
    }
  );
  return Admin;
};