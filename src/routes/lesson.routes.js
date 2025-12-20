import { Router } from "express";
import lessonController from "../controllers/lesson.controller.js";
import tokenGuard from "../guards/check.token.guard.js";
import { adminInstructorSuperAdminGuard } from "../guards/role.guard.js";
import multer from "multer";

const lessonRouter = Router();
const upload = multer({ dest: "uploads/" });

lessonRouter.post("/", tokenGuard, upload.single("video"), lessonController.CREATE);
lessonRouter.get("/", tokenGuard, lessonController.GET_ALL);
lessonRouter.get("/:id", tokenGuard, lessonController.GET_BY_ID);
lessonRouter.put("/:id", tokenGuard, adminInstructorSuperAdminGuard, upload.single("video"), lessonController.UPDATE);
lessonRouter.delete("/:id", tokenGuard, adminInstructorSuperAdminGuard, lessonController.DELETE);

export default lessonRouter;
