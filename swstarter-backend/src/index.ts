import express from "express";
import cors from "cors";
import { config } from "./config/env";
import swRoutes from "./routes/swRoutes";
import statsRoutes from "./routes/statsRoutes";
import queueRoutes from "./routes/queueRoutes";
import {
  notFoundHandler,
  errorHandler,
  errorLoggingMiddleware,
  loggingMiddleware,
} from "./middlewares";
import { cacheService } from "./services/cacheService";
import { loggerService } from "./services/loggerService";
import { jobsQueue } from "./services/queueService";
import { schedulerService } from "./services/schedulerService";

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(loggingMiddleware);

//routes
app.use("/api/stats", statsRoutes);
app.use("/api/queue", queueRoutes);
app.use("/api", swRoutes);

//handlers
app.use(errorLoggingMiddleware);
app.use("*", notFoundHandler);
app.use(errorHandler);

app.listen(config.port, async () => {
  console.log(`Server running on port ${config.port}`);
  console.log(`API available at http://localhost:${config.port}/api`);

  // Initialize cache service
  try {
    await cacheService.connect();
    console.log("Cache service initialized successfully");
  } catch (error) {
    console.error("Failed to initialize cache service:", error);
  }

  // Initialize logger service
  try {
    await loggerService.connect();
    console.log("Logger service initialized successfully");

    // Log server startup
    await loggerService.info("Server started successfully", {
      port: config.port,
      environment: process.env["NODE_ENV"] || "development",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to initialize logger service:", error);
  }

  // Initialize queue service
  try {
    console.log("Queue service initialized successfully");
    console.log("Jobs queue is ready to process tasks");
  } catch (error) {
    console.error("Failed to initialize queue service:", error);
  }

  // Initialize and start scheduler service
  try {
    schedulerService.start();
    console.log("Scheduler service started successfully");
  } catch (error) {
    console.error("Failed to initialize scheduler service:", error);
  }
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  await loggerService.info("Server shutting down - SIGTERM received", {
    signal: "SIGTERM",
    timestamp: new Date().toISOString(),
  });
  await cacheService.disconnect();
  await loggerService.disconnect();
  await jobsQueue.close();
  schedulerService.stop();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, shutting down gracefully");
  await loggerService.info("Server shutting down - SIGINT received", {
    signal: "SIGINT",
    timestamp: new Date().toISOString(),
  });
  await cacheService.disconnect();
  await loggerService.disconnect();
  await jobsQueue.close();
  schedulerService.stop();
  process.exit(0);
});
