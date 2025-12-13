import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Lesson = sequelize.define("Lesson", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey : true
      },
      course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      video_url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      video_id: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      duration: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      tableName: "lessons",
      timestamps: true,
    }
  );
  return Lesson;
};