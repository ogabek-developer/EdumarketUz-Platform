import { DataTypes } from "sequelize";
import { sequelize } from "../../lib/db.service.js";

const UserModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM("super_admin", "admin", "instructor", "student"),
      defaultValue : "student",
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    photo_id: {
      type: DataTypes.TEXT,
      allowNull: true
    }
    
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

export default UserModel