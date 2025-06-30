import mongoose from "mongoose";
import { Log } from "../models/Log";
import { config } from "../config/env";

class LoggerService {
  private isConnected = false;

  async connect(): Promise<void> {
    if (this.isConnected) return;

    try {
      await mongoose.connect(config.mongodbUri);
      this.isConnected = true;
      console.log("Logger service connected to MongoDB");
    } catch (error) {
      console.error("Failed to connect logger service to MongoDB:", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (!this.isConnected) return;

    try {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log("Logger service disconnected from MongoDB");
    } catch (error) {
      console.error("Failed to disconnect logger service from MongoDB:", error);
      throw error;
    }
  }

  async info(message: string, meta?: any): Promise<void> {
    await this.log("info", message, undefined, meta);
  }

  async error(message: string, error?: Error, meta?: any): Promise<void> {
    await this.log("error", message, error, meta);
  }

  async warn(message: string, meta?: any): Promise<void> {
    await this.log("warn", message, undefined, meta);
  }

  async debug(message: string, meta?: any): Promise<void> {
    await this.log("debug", message, undefined, meta);
  }

  private async log(level: string, message: string, error?: Error, meta?: any): Promise<void> {
    if (!this.isConnected) {
      console.warn("Logger service not connected, falling back to console");
      this.logToConsole(level, message, error, meta);
      return;
    }

    try {
      const logData: any = {
        level,
        message,
        meta,
        service: "lawnstarter-backend",
        environment: process.env["NODE_ENV"] || "development",
      };

      if (error) {
        logData.error = {
          name: error.name,
          message: error.message,
          stack: error.stack,
        };
      }

      await Log.create(logData);
    } catch (logError) {
      console.error("Failed to save log to MongoDB:", logError);
      // Fallback to console
      this.logToConsole(level, message, error, meta);
    }
  }

  private logToConsole(level: string, message: string, error?: Error, meta?: any): void {
    const logData = { error, meta };

    switch (level) {
      case "info":
        console.info(message, logData);
        break;
      case "error":
        console.error(message, logData);
        break;
      case "warn":
        console.warn(message, logData);
        break;
      case "debug":
        console.debug(message, logData);
        break;
      default:
        console.log(message, logData);
    }
  }
}

export const loggerService = new LoggerService();
