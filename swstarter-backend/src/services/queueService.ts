import Queue from "bull";
import { config } from "../config/env";
import { JobData } from "../lib/types";
import { requestsHistogramHandler, externalRequestedLogsSummaryHandler } from "./handlers";

export const jobsQueue = new Queue<JobData>("jobs", config.redisUrl);

jobsQueue.process(async (job) => {
  const { type, payload, timestamp } = job.data;

  console.log(`Processing job: ${type}`, {
    payload,
    timestamp,
    jobId: job.id,
  });

  try {
    switch (type) {
      case "requestsHistogram":
        return await requestsHistogramHandler();

      case "externalRequestedLogsSummary":
        return await externalRequestedLogsSummaryHandler(payload?.delay);

      default:
        console.error(`Unknown job type: ${type}`);
        throw new Error(`Unknown job type: ${type}`);
    }
  } catch (error) {
    console.error(`Error processing job ${type}:`, error);
    throw error;
  }
});

jobsQueue.on("completed", (job, result) => {
  console.log(`Job ${job.id} completed with result:`, result);
});

jobsQueue.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed:`, err);
});

jobsQueue.on("error", (err) => {
  console.error("Queue error:", err);
});

export const addJob = async (type: string, payload: any = {}) => {
  const jobData: JobData = {
    type,
    payload,
    timestamp: Date.now(),
  };

  const job = await jobsQueue.add(jobData);
  console.log(`Job added to queue: ${type} with ID: ${job.id}`);
  return job;
};
