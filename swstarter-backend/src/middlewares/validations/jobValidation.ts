import { Request, Response, NextFunction } from "express";

export interface JobRequest extends Request {
  body: {
    type: string;
    payload?: any;
  };
}

const VALID_JOB_TYPES = ["requestsHistogram", "externalRequestedLogsSummary"];

export const validateJobRequest = (req: JobRequest, res: Response, next: NextFunction): void => {
  const { type, payload } = req.body;

  if (!type) {
    res.status(400).json({
      error: "Type parameter is required",
      message: "Please provide a job type",
    });
    return;
  }

  if (typeof type !== "string" || type.trim().length === 0) {
    res.status(400).json({
      error: "Invalid type parameter",
      message: "Type must be a non-empty string",
    });
    return;
  }

  if (!VALID_JOB_TYPES.includes(type)) {
    res.status(400).json({
      error: "Invalid job type",
      message: `Valid job types are: ${VALID_JOB_TYPES.join(", ")}`,
    });
    return;
  }

  if (payload !== undefined && typeof payload !== "object") {
    res.status(400).json({
      error: "Invalid payload parameter",
      message: "Payload must be an object",
    });
    return;
  }

  next();
};
