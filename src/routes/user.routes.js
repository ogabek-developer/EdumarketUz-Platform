
import {Router} from "express"
import userController from "../controllers/user.controller.js";
import tokenGuard from "../guards/check.token.guard.js";
import superAdminGuard from "../guards/super_admin.guard.js";
import adminGuard from "../guards/admin.guard.js";
import {adminOrSuperAdminGuard} from "../guards/role.guard.js"

const userRouter = Router() ;

userRouter.get('/get/all', tokenGuard , userController.GET_ALL) ;
userRouter.get('/:id', tokenGuard , adminGuard ,userController.GET_BY_ID ) ;
userRouter.delete('/:id', tokenGuard , superAdminGuard , userController.DELETE_USER) ;

// update user UPDATE_ROLE

userRouter.put('/:id', tokenGuard  , adminOrSuperAdminGuard , userController.UPDATE_ROLE)


export default userRouter ;

