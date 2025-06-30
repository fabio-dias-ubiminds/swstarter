import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import mongoose from "mongoose";
import { externalRequestedLogsSummaryHandler } from "../../../src/services/handlers/externalRequestedLogsSummaryHandler";
import { Log } from "../../../src/models/Log";

// Mock mongoose
vi.mock("mongoose", () => ({
  default: {
    connection: {
      collection: vi.fn(() => ({
        insertOne: vi.fn(),
      })),
    },
  },
}));

// Mock Log model
vi.mock("../../../src/models/Log", () => ({
  Log: {
    find: vi.fn(() => ({
      select: vi.fn(),
    })),
  },
}));

describe("externalRequestedLogsSummaryHandler", () => {
  let mockCollection: any;
  let mockLogFind: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockCollection = {
      insertOne: vi.fn(),
    };
    mockLogFind = {
      select: vi.fn(),
    };

    vi.mocked(mongoose.connection.collection).mockReturnValue(mockCollection);
    vi.mocked(Log.find).mockReturnValue(mockLogFind);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should generate summary with correct data structure", async () => {
    const mockLogs = [
      { meta: { endpoint: "/api/sw/search", responseTime: 100 } },
      { meta: { endpoint: "/api/sw/search", responseTime: 200 } },
      { meta: { endpoint: "/api/sw/people/1", responseTime: 150 } },
      { meta: { endpoint: "/api/sw/search", responseTime: 300 } },
    ];

    vi.mocked(mockLogFind.select).mockResolvedValue(mockLogs);

    const result = await externalRequestedLogsSummaryHandler();

    expect(result).toMatchObject({
      averageResponseTime: 187.5, // (100 + 200 + 150 + 300) / 4
      mostUsedEndpoint: "/api/sw/search",
      mostUsedEndpointCount: 3,
      mostUsedEndpointPercentage: 75,
      totalRequests: 4,
      period: {
        start: expect.any(Date),
        end: expect.any(Date),
      },
      generatedAt: expect.any(Date),
    });

    expect(mockCollection.insertOne).toHaveBeenCalledWith(result);
  });

  it("should handle empty logs", async () => {
    vi.mocked(mockLogFind.select).mockResolvedValue([]);

    const result = await externalRequestedLogsSummaryHandler();

    expect(result).toMatchObject({
      averageResponseTime: 0,
      mostUsedEndpoint: "",
      mostUsedEndpointCount: 0,
      mostUsedEndpointPercentage: 0,
      totalRequests: 0,
      period: {
        start: expect.any(Date),
        end: expect.any(Date),
      },
      generatedAt: expect.any(Date),
    });
  });

  it("should calculate average response time correctly", async () => {
    const mockLogs = [
      { meta: { endpoint: "/api/sw/search", responseTime: 100 } },
      { meta: { endpoint: "/api/sw/search", responseTime: 200 } },
      { meta: { endpoint: "/api/sw/search", responseTime: 300 } },
    ];

    vi.mocked(mockLogFind.select).mockResolvedValue(mockLogs);

    const result = await externalRequestedLogsSummaryHandler();

    expect(result.averageResponseTime).toBe(200); // (100 + 200 + 300) / 3
  });

  it("should handle non-numeric response times", async () => {
    const mockLogs = [
      { meta: { endpoint: "/api/sw/search", responseTime: 100 } },
      { meta: { endpoint: "/api/sw/search", responseTime: "invalid" } },
      { meta: { endpoint: "/api/sw/search", responseTime: 300 } },
    ];

    vi.mocked(mockLogFind.select).mockResolvedValue(mockLogs);

    const result = await externalRequestedLogsSummaryHandler();

    expect(result.averageResponseTime).toBe(200); // (100 + 300) / 2
  });

  it("should find most used endpoint correctly", async () => {
    const mockLogs = [
      { meta: { endpoint: "/api/sw/search", responseTime: 100 } },
      { meta: { endpoint: "/api/sw/search", responseTime: 200 } },
      { meta: { endpoint: "/api/sw/people/1", responseTime: 150 } },
      { meta: { endpoint: "/api/sw/movies/1", responseTime: 300 } },
      { meta: { endpoint: "/api/sw/movies/2", responseTime: 250 } },
    ];

    vi.mocked(mockLogFind.select).mockResolvedValue(mockLogs);

    const result = await externalRequestedLogsSummaryHandler();

    expect(result.mostUsedEndpoint).toBe("/api/sw/search");
    expect(result.mostUsedEndpointCount).toBe(2);
    expect(result.mostUsedEndpointPercentage).toBe(40);
  });

  it("should use correct time period (last 24 hours)", async () => {
    const now = new Date("2024-01-01T12:00:00Z");
    vi.setSystemTime(now);

    vi.mocked(mockLogFind.select).mockResolvedValue([]);

    await externalRequestedLogsSummaryHandler();

    const expectedStartDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const expectedEndDate = now;

    expect(Log.find).toHaveBeenCalledWith({
      timestamp: {
        $gte: expectedStartDate,
        $lte: expectedEndDate,
      },
      "meta.endpoint": { $exists: true },
      "meta.responseTime": { $exists: true },
    });

    vi.useRealTimers();
  });

  it("should save result to MongoDB", async () => {
    const mockLogs = [{ meta: { endpoint: "/api/sw/search", responseTime: 100 } }];

    vi.mocked(mockLogFind.select).mockResolvedValue(mockLogs);

    const result = await externalRequestedLogsSummaryHandler();

    expect(mongoose.connection.collection).toHaveBeenCalledWith("externalRequestedLogsSummary");
    expect(mockCollection.insertOne).toHaveBeenCalledWith(result);
  });

  it("should handle database errors gracefully", async () => {
    const mockLogs = [{ meta: { endpoint: "/api/sw/search", responseTime: 100 } }];

    vi.mocked(mockLogFind.select).mockResolvedValue(mockLogs);
    vi.mocked(mockCollection.insertOne).mockRejectedValue(new Error("Database error"));

    await expect(externalRequestedLogsSummaryHandler()).rejects.toThrow("Database error");
  });
});
