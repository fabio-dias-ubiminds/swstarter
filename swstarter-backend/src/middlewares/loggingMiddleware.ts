import { Request, Response, NextFunction } from "express";
import { loggerService } from "../services/loggerService";

export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  const { method, url, ip, headers } = req;

  // Extract endpoint from URL (remove query parameters)
  const endpoint = url.split("?")[0];

  // Log request start
  loggerService.info("HTTP Request started", {
    method,
    url,
    endpoint,
    ip,
    userAgent: headers["user-agent"],
    timestamp: new Date().toISOString(),
  });

  // Override res.end to log response
  const originalEnd = res.end;
  res.end = function (chunk?: any, encoding?: any, cb?: () => void) {
    const duration = Date.now() - startTime;
    const responseTime = duration;
    const { statusCode } = res;

    // Log response
    const logLevel = statusCode >= 400 ? "error" : "info";
    const logMessage = `HTTP Request completed - ${method} ${url}`;
    const metadata = {
      method,
      url,
      endpoint,
      statusCode,
      duration: `${duration}ms`,
      responseTime,
      ip,
      userAgent: headers["user-agent"],
      timestamp: new Date().toISOString(),
    };

    if (logLevel === "error") {
      loggerService.error(logMessage, undefined, metadata);
    } else {
      loggerService.info(logMessage, metadata);
    }

    return originalEnd.call(this, chunk, encoding, cb);
  };

  next();
};
