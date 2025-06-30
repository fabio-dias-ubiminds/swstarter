import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const config = {
  swapiBaseUrl: process.env["SWAPI_BASE_URL"] || "https://swapi.info/api",
  port: process.env["PORT"] || 3001,
  redisUrl: process.env["REDIS_URL"] || "redis://localhost:6379",
  mongodbUri: process.env["MONGODB_URI"] || "mongodb://localhost:27017/lawnstarter",
  statsJobIntervalMinutes: parseInt(process.env["STATS_JOB_INTERVAL_MINUTES"] || "5"),
};
