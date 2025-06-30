import { Router } from "express";
import { StatsController } from "../controllers/statsController";
import { validateStatsRequest } from "../middlewares/validations/statsValidation";

const router = Router();

const statsController = new StatsController();

router.get("/", validateStatsRequest, statsController.getStats.bind(statsController));

export default router;
