
import { Router } from "express";
import adminController from "../controllers/admin.controller.js";
import tokenGuard from "../guards/check.token.guard.js";
import adminGuard from "../guards/admin.guard.js";
import superAdminGuard from "../guards/super_admin.guard.js";

const adminRouter = Router();

adminRouter.post("/", tokenGuard, superAdminGuard, adminController.CREATE);
adminRouter.get("/", tokenGuard, adminGuard, adminController.GET_ALL);
adminRouter.get("/:id", tokenGuard, adminGuard, adminController.GET_BY_ID);
adminRouter.put("/:id", tokenGuard, superAdminGuard, adminController.UPDATE);
adminRouter.delete("/:id", tokenGuard, superAdminGuard, adminController.DELETE);

export default adminRouter;
