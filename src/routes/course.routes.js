import { Router } from "express";
import courseController from "../controllers/course.controller.js";
import tokenGuard from "../guards/check.token.guard.js";
import { 
    adminOrInstructorGuard, 
    adminOrSuperAdminGuard, 
    adminInstructorSuperAdminGuard 
} from "../guards/role.guard.js";

const courseRouter = Router();

courseRouter.post(
    "/",
    tokenGuard,
    adminOrInstructorGuard,
    courseController.CREATE
);

courseRouter.get(
    "/",
    tokenGuard,
    courseController.GET_ALL
);

courseRouter.get(
    "/:id",
    tokenGuard,
    courseController.GET_BY_ID
);

courseRouter.put(
    "/:id",
    tokenGuard,
    adminOrInstructorGuard,
    courseController.UPDATE
);

courseRouter.delete(
    "/:id",
    tokenGuard,
    adminInstructorSuperAdminGuard,
    courseController.DELETE
);

export default courseRouter;
