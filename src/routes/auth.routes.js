
import {Router} from "express" ;
import authController from "../controllers/auth.controller.js";




const authRouter = Router() ;


authRouter.post('/register', authController.REGISTER); 
authRouter.post('/verify/otp', authController.VERIFY); 
authRouter.post('/resend/otp', authController.RESEND_OTP) ;
authRouter.post('/forgot/password', authController.FORGOT_PASSWORD) ;
authRouter.post("/change/password", authController.CHANGE_PASSWORD);
authRouter.post("/login", authController.LOGIN);
authRouter.post('/refresh', authController.REFRESH)


export default authRouter ;



