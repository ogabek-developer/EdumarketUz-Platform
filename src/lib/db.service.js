import {Sequelize} from "sequelize"
import dotenv from "dotenv"
dotenv.config()

export const sequelize = new Sequelize({
    dialect : "postgres",
    database : process.env.DB_NAME,
    port : process.env.DB_PORT,
    host : process.env.DB_HOST,
    password : process.env.DB_PASSWORD,
    username : process.env.DB_USER,
    logging : false
});

export async function db_service(){
    try {
        await sequelize.authenticate() ;
        console.log(`db successfully connected !`) ;
        await sequelize.sync({alter : true})
    } catch (error) {
        console.log(`DB CONNECTION ERROR : ${error}`)
    }
};


