import { DataTypes } from "sequelize";
import { sequelize } from "../../lib/db.service.js";

const AdminModel = sequelize.define("Admin", {
    id : {
        type : DataTypes.BIGINT,
        autoIncrement : true,
        primaryKey : true
    },
    user_id : {
        type : DataTypes.BIGINT,
        allowNull : false
    },
    is_super : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    }
    
}, {
    tableName: "admins",
    timestamps : true,
});

export default AdminModel 