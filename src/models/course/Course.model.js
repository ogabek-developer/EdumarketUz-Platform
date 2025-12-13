import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Course = sequelize.define("Course", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      instructor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      level: {
        type: DataTypes.ENUM("beginner", "intermediate", "advanced"),
        defaultValue: "beginner",
        allowNull: false,
      },
      is_free: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      lesson_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "courses",
      timestamps: true,
    }
  );
  return Course;
};