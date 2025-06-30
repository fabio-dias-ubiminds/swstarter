import { config } from "../config/env";
import { addJob } from "./queueService";

class SchedulerService {
  private intervalId: NodeJS.Timeout | null = null;
  private isRunning = false;

  start() {
    if (this.isRunning) {
      console.log("Scheduler is already running");
      return;
    }

    const intervalMs = config.statsJobIntervalMinutes * 60 * 1000; // Convert minutes to milliseconds

    console.log(
      `Starting scheduler with interval: ${config.statsJobIntervalMinutes} minutes (${intervalMs}ms)`
    );

    this.intervalId = setInterval(async () => {
      try {
        await this.runStatsJobs();
      } catch (error) {
        console.error("Error running stats jobs:", error);
      }
    }, intervalMs);

    this.isRunning = true;

    // Run initial jobs
    this.runStatsJobs();
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isRunning = false;
      console.log("Scheduler stopped");
    }
  }

  private async runStatsJobs() {
    try {
      // Run requests histogram job
      const histogramJob = await addJob("requestsHistogram", {
        scheduled: true,
        timestamp: new Date().toISOString(),
      });
      console.log(`Requests histogram job added to queue with ID: ${histogramJob.id}`);
    } catch (error) {
      console.error("Failed to add stats jobs to queue:", error);
    }
  }
}

export const schedulerService = new SchedulerService();
