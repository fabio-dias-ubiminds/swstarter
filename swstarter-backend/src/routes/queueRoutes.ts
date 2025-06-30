import { Router } from "express";
import { QueueController } from "../controllers/queueController";
import { validateJobRequest } from "../middlewares/validations/jobValidation";

const router = Router();

const queueController = new QueueController();

router.post("/jobs", validateJobRequest, queueController.addJob.bind(queueController));

export default router;
