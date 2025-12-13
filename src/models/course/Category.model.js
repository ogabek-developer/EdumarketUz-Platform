import { DataTypes } from "sequelize";
import { sequelize } from "../../lib/db.service.js";


const CategoryModel = sequelize.define("Category" ,{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: "categories",
    timestamps: true
});

export default CategoryModel;