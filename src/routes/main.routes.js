
import {Router} from "express"
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
// import categoryController from "../controllers/category.controller.js";
import categoryRouter from "./category.routes.js";
// import instructorController from "../controllers/instructor.controller.js";
import instructorRouter from "./instructor.routes.js";
import adminRouter from "./admin.routes.js";
import notificationRouter from "./notification.routes.js";
import courseRouter from "./course.routes.js";

const mainRouter = Router() ;

mainRouter.use("/auth", authRouter) ;
mainRouter.use('/user', userRouter) ;
mainRouter.use('/category', categoryRouter) ;
mainRouter.use('/instructor', instructorRouter) ;
mainRouter.use("/admin", adminRouter);
mainRouter.use("/notification", notificationRouter) ;
mainRouter.use("/course", courseRouter) ;


export default mainRouter;
