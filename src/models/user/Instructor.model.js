import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Instructor = sequelize.define("Instructor", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      skills: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "instructors",
      timestamps: true,
    }
  );
  return Instructor
};