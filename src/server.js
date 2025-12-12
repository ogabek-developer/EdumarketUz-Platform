
import express from "express"
import cors from "cors"
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import { db_service } from "./lib/db.service.js";
config() ;
db_service().catch((err) => console.log(err))

const app = express() ;

app.use(express.json());
app.use(cors()) ;
app.use(cookieParser()) ;


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is running on port : (http://127.0.0.1:${port}/)`))





