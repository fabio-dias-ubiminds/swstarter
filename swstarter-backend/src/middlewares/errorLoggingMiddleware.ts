import { Request, Response, NextFunction } from "express";
import { loggerService } from "../services/loggerService";

export const errorLoggingMiddleware = async (
  error: Error,
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  await loggerService.error("Unhandled error occurred", error, {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
    timestamp: new Date().toISOString(),
  });

  next(error);
};
