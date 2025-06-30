import { Response } from "express";
import mongoose from "mongoose";
import { StatsRequest } from "../middlewares/validations/statsValidation";

export class StatsController {
  async getStats(req: StatsRequest, res: Response): Promise<void> {
    const { report } = req.query;
    const collection = mongoose.connection.collection(report ?? "");

    const latestReport = await collection.find({}).sort({ generatedAt: -1 }).limit(1).toArray();

    if (latestReport.length === 0) {
      res.status(404).json({
        error: `No reports found for type: ${report}`,
        message: "Try running a job first to generate the report",
      });
      return;
    }

    res.status(200).json(latestReport[0]);
  }
}
