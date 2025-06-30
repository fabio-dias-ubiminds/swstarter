import mongoose from "mongoose";
import { Log } from "../../models/Log";

interface RequestsHistogramData {
  endpoint: string;
  count: number;
  percentage: number;
}

interface RequestsHistogramResult {
  totalRequests: number;
  histogram: RequestsHistogramData[];
  period: {
    start: Date;
    end: Date;
  };
  generatedAt: Date;
}

export const requestsHistogramHandler = async (): Promise<RequestsHistogramResult> => {
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago

  // Get all logs from the last 24 hours
  const logs = await Log.find({
    timestamp: { $gte: startDate, $lte: endDate },
    "meta.endpoint": { $exists: true },
  }).select("meta.endpoint");

  // Count requests by endpoint
  const endpointCounts: { [key: string]: number } = {};
  let totalRequests = 0;

  logs.forEach((log) => {
    const endpoint = log.meta?.endpoint;
    if (endpoint) {
      endpointCounts[endpoint] = (endpointCounts[endpoint] || 0) + 1;
      totalRequests++;
    }
  });

  // Convert to array and calculate percentages
  const histogram: RequestsHistogramData[] = Object.entries(endpointCounts)
    .map(([endpoint, count]) => ({
      endpoint,
      count,
      percentage: totalRequests > 0 ? Math.round((count / totalRequests) * 100 * 100) / 100 : 0,
    }))
    .sort((a, b) => b.count - a.count);

  const result: RequestsHistogramResult = {
    totalRequests,
    histogram,
    period: {
      start: startDate,
      end: endDate,
    },
    generatedAt: new Date(),
  };

  // Save to MongoDB
  const collection = mongoose.connection.collection("requestsHistogram");
  await collection.insertOne(result);

  return result;
};
