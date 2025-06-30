import { Request, Response, NextFunction } from "express";
import { cacheService } from "../services/cacheService";
import { CacheOptions } from "../lib/types";

export const cacheMiddleware = (options: CacheOptions = {}) => {
  const { ttl = 300, key } = options;

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cacheKey =
        key ||
        cacheService.generateKey(
          "http",
          req.method,
          req.originalUrl,
          JSON.stringify(req.query),
          JSON.stringify(req.body)
        );

      const cached = await cacheService.get(cacheKey);
      if (cached) {
        res.json(cached);
        return;
      }

      const originalJson = res.json;

      res.json = function (data: any) {
        cacheService.set(cacheKey, data, ttl);
        return originalJson.call(this, data);
      };

      next();
    } catch (error) {
      console.error("Cache middleware error:", error);
      next();
    }
  };
};
