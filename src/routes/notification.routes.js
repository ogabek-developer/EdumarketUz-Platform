import { Router } from "express";
import notificationController from "../controllers/notification.controller.js";
import tokenGuard from "../guards/check.token.guard.js";
import adminGuard from "../guards/admin.guard.js";

const notificationRouter = Router();

notificationRouter.post(
    "/",
    tokenGuard,
    adminGuard,
    notificationController.CREATE
);

notificationRouter.get(
    "/",
    tokenGuard,
    notificationController.GET_ALL
);

notificationRouter.get(
    "/:id",
    tokenGuard,
    notificationController.GET_BY_ID
);

notificationRouter.delete(
    "/:id",
    tokenGuard,
    adminGuard,
    notificationController.DELETE
);

export default notificationRouter;
