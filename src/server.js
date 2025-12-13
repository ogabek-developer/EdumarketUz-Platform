
import express from "express"
import cors from "cors"
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import { db_service } from "./lib/db.service.js";
import mainRouter from "./routes/main.routes.js";
config() ;

db_service().catch((err) => {
    console.log(err.message),
    process.exit(1)
})

const app = express() ;

app.use(express.json());
app.use(cors()) ;
app.use(cookieParser()) ;
app.use("/api", mainRouter)


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is running on port : (http://127.0.0.1:${port}/)`))





