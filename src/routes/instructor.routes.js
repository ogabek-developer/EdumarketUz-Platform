
import { Router } from "express";
import instructorController from "../controllers/instructor.controller.js";
import tokenGuard from "../guards/check.token.guard.js";
import adminGuard from "../guards/admin.guard.js";

const instructorRouter = Router();

instructorRouter.post("/", tokenGuard, adminGuard, instructorController.CREATE);
instructorRouter.get("/", tokenGuard, instructorController.GET_ALL);
instructorRouter.get("/:id", tokenGuard, instructorController.GET_BY_ID);
instructorRouter.put("/:id", tokenGuard, adminGuard, instructorController.UPDATE);
instructorRouter.delete("/:id", tokenGuard, adminGuard, instructorController.DELETE);

export default instructorRouter;
