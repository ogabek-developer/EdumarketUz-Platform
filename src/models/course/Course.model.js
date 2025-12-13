import { DataTypes } from "sequelize";
import { sequelize } from "../../lib/db.service.js";

const CourseModel = sequelize.define(
  "Course",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    instructor_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    level: {
      type: DataTypes.ENUM("beginner", "intermediate", "advanced"),
      defaultValue : "beginner"
    },
    is_free: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    tableName: "courses",
    timestamps: true
  }
);

export default CourseModel;
