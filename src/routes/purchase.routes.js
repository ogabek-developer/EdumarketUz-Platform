
import { Router } from "express";
import purchaseController from "../controllers/purchase.controller.js";
import tokenGuard from "../guards/check.token.guard.js";

const purchaseRouter = Router();

purchaseRouter.post(
  "/",
  tokenGuard,
  purchaseController.CREATE
);

purchaseRouter.get(
  "/",
  tokenGuard,
  purchaseController.GET_ALL
);

purchaseRouter.get(
  "/:id",
  tokenGuard,
  purchaseController.GET_BY_ID
);

purchaseRouter.delete(
  "/:id",
  tokenGuard,
  purchaseController.DELETE
);

export default purchaseRouter;
