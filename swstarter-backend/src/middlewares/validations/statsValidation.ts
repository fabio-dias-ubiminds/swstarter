import { Request, Response, NextFunction } from "express";

export interface StatsRequest extends Request {
  query: {
    report?: string;
  };
}

const VALID_REPORT_TYPES = ["requestsHistogram", "externalRequestedLogsSummary"];

export const validateStatsRequest = (
  req: StatsRequest,
  res: Response,
  next: NextFunction
): void => {
  const { report } = req.query;

  if (!report) {
    res.status(400).json({
      error: "Report parameter is required",
      message: `Please provide a report type. Available reports: ${VALID_REPORT_TYPES.join(", ")}`,
    });
    return;
  }

  if (typeof report !== "string" || report.trim().length === 0) {
    res.status(400).json({
      error: "Invalid report parameter",
      message: "Report must be a non-empty string",
    });
    return;
  }

  if (!VALID_REPORT_TYPES.includes(report)) {
    res.status(400).json({
      error: "Invalid report type",
      message: `Valid report types are: ${VALID_REPORT_TYPES.join(", ")}`,
    });
    return;
  }

  next();
};
