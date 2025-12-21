

import { Router } from "express";
import statsController from "../controllers/stats.controller.js";
import tokenGuard from "../guards/check.token.guard.js";
import { adminOrSuperAdminGuard } from "../guards/role.guard.js";

const statsRouter = Router();

statsRouter.get(
  "/",
  tokenGuard,
  adminOrSuperAdminGuard,
  statsController.LAST_30_DAYS_SALES
);

export default statsRouter;
