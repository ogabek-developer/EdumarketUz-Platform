import { DataTypes } from "sequelize";
import { sequelize } from "../../lib/db.service.js";

const InstructorModel = sequelize.define("Instructor", {
    id : {
        type : DataTypes.BIGINT,
        autoIncrement : true,
        primaryKey : true
    },
    user_id : {
        type : DataTypes.BIGINT,
        allowNull : false
    },
    bio : {
        type : DataTypes.TEXT,
        allowNull : false
    },
    skills : {
        type : DataTypes.STRING,
        allowNull : false
    }

},{
    timestamps : true,
    tableName : "instructors"
});

export default InstructorModel;