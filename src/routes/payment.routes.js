
import { Router } from "express";
import paymentController from "../controllers/payment.controller.js";
import tokenGuard from "../guards/check.token.guard.js";
import adminGuard from "../guards/admin.guard.js";

const paymentRouter = Router();

paymentRouter.post(
  "/",
  tokenGuard,
  paymentController.CREATE
);

paymentRouter.get(
  "/",
  tokenGuard,
  paymentController.GET_ALL
);

paymentRouter.get(
  "/:id",
  tokenGuard,
  paymentController.GET_BY_ID
);

export default paymentRouter;
