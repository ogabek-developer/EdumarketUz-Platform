
import {Router} from "express"
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
// import categoryController from "../controllers/category.controller.js";
import categoryRouter from "./category.routes.js";

const mainRouter = Router() ;

mainRouter.use("/auth", authRouter) ;
mainRouter.use('/user', userRouter) ;
mainRouter.use('/category', categoryRouter)

export default mainRouter;