import mongoose from "mongoose";
import { Log } from "../../models/Log";

interface ExternalRequestedLogsSummaryResult {
  averageResponseTime: number;
  mostUsedEndpoint: string;
  mostUsedEndpointCount: number;
  mostUsedEndpointPercentage: number;
  totalRequests: number;
  period: {
    start: Date;
    end: Date;
  };
  generatedAt: Date;
}

export const externalRequestedLogsSummaryHandler = async (
  delay = 0
): Promise<ExternalRequestedLogsSummaryResult> => {
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago

  if (delay > 0) {
    //just to see the queue being processed
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  // Get all logs from the last 24 hours with response time and endpoint data
  const logs = await Log.find({
    timestamp: { $gte: startDate, $lte: endDate },
    "meta.endpoint": { $exists: true },
    "meta.responseTime": { $exists: true },
  }).select("meta.endpoint meta.responseTime");

  // Calculate average response time
  let totalResponseTime = 0;
  let validResponseTimeCount = 0;
  const endpointCounts: { [key: string]: number } = {};
  let totalRequests = 0;

  logs.forEach((log) => {
    const endpoint = log.meta?.endpoint;
    const responseTime = log.meta?.responseTime;

    if (endpoint) {
      endpointCounts[endpoint] = (endpointCounts[endpoint] || 0) + 1;
      totalRequests++;
    }

    if (responseTime && typeof responseTime === "number") {
      totalResponseTime += responseTime;
      validResponseTimeCount++;
    }
  });

  const averageResponseTime =
    validResponseTimeCount > 0
      ? Math.round((totalResponseTime / validResponseTimeCount) * 100) / 100
      : 0;

  // Find most used endpoint
  let mostUsedEndpoint = "";
  let mostUsedEndpointCount = 0;
  let mostUsedEndpointPercentage = 0;

  if (totalRequests > 0) {
    const sortedEndpoints = Object.entries(endpointCounts).sort(([, a], [, b]) => b - a);

    if (sortedEndpoints.length > 0) {
      mostUsedEndpoint = sortedEndpoints[0]?.[0] ?? "";
      mostUsedEndpointCount = sortedEndpoints[0]?.[1] ?? 0;
      mostUsedEndpointPercentage =
        Math.round((mostUsedEndpointCount / totalRequests) * 100 * 100) / 100;
    }
  }

  const result: ExternalRequestedLogsSummaryResult = {
    averageResponseTime,
    mostUsedEndpoint,
    mostUsedEndpointCount,
    mostUsedEndpointPercentage,
    totalRequests,
    period: {
      start: startDate,
      end: endDate,
    },
    generatedAt: new Date(),
  };

  // Save to MongoDB
  const collection = mongoose.connection.collection("externalRequestedLogsSummary");
  await collection.insertOne(result);

  return result;
};
