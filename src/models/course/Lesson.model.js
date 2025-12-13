
import { DataTypes } from "sequelize";
import { sequelize } from "../../lib/db.service.js";


const LessonModel = sequelize.define("Lesson", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    video_url: {
        type: DataTypes.TEXT, 
        allowNull: true, 
        validate: {
            isUrl: true
        }
    },
    duration : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    video_id : {
        type : DataTypes.TEXT,
        allowNull : false
    } 
}, {
    tableName: "lessons",
    timestamps: true
});

export default LessonModel;
