import { Response } from "express";
import { addJob } from "../services/queueService";
import { JobRequest } from "../middlewares/validations/jobValidation";

export class QueueController {
  async addJob(req: JobRequest, res: Response): Promise<void> {
    const { type, payload } = req.body;

    const job = await addJob(type, payload);
    res.status(201).json({
      message: "Job added to queue",
      jobId: job.id,
      type,
      payload,
    });
  }
}
