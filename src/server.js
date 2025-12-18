
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




// register / verify otp / resend otp / forgot password / change password / login / refresh ✔

// super_admin  : get all users / create (admin / instructor) / update role (all users) / delete (all users)  
// super_admin : categories (CRUD) / course (get courses , delete courses , update courses) / lesson (GET , PUT , DELETE)
// super_admin : stats and reports (30 kunlik sotuvlar statistikasi , eng ko'p sotilgan kurslar ) !

// admin : users (all get) / change role to (student/instructor) / blocked and Active (all users ) / course (GET, PUT)
// admin : lessons (GET ALL) / stats and reports (30 kunlik sotuvlar statistikasi, eng ko'p sotilgan kurslar) 
// admin : notifications create (notification)

// Instructors : course (CRUD) / lessons (CRUD) 

// students : GET my courses (USERS ALL)  / courses (GET + filter, name and category) orders and payments (POST, GET)
//students : GET my courses to (LESSONS GET ALL MY LESSONS) / profile (GET , PUT , CHANGE_PASSWORD) 

// majburiyatlar :  swagger , 2fa authentication , sequelizedan foydalanish , Refresh token : else = BOTTLE


