import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import mongoose from "mongoose";
import { requestsHistogramHandler } from "../../../src/services/handlers/requestsHistogramHandler";
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

describe("requestsHistogramHandler", () => {
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

  it("should generate histogram with correct data structure", async () => {
    const mockLogs = [
      { meta: { endpoint: "/api/sw/search" } },
      { meta: { endpoint: "/api/sw/search" } },
      { meta: { endpoint: "/api/sw/people/1" } },
      { meta: { endpoint: "/api/sw/movies/1" } },
      { meta: { endpoint: "/api/sw/search" } },
    ];

    vi.mocked(mockLogFind.select).mockResolvedValue(mockLogs);

    const result = await requestsHistogramHandler();

    expect(result).toMatchObject({
      totalRequests: 5,
      histogram: [
        { endpoint: "/api/sw/search", count: 3, percentage: 60 },
        { endpoint: "/api/sw/people/1", count: 1, percentage: 20 },
        { endpoint: "/api/sw/movies/1", count: 1, percentage: 20 },
      ],
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

    const result = await requestsHistogramHandler();

    expect(result).toMatchObject({
      totalRequests: 0,
      histogram: [],
      period: {
        start: expect.any(Date),
        end: expect.any(Date),
      },
      generatedAt: expect.any(Date),
    });
  });

  it("should filter logs without endpoint", async () => {
    const mockLogs = [
      { meta: { endpoint: "/api/sw/search" } },
      { meta: {} },
      { meta: { endpoint: "/api/sw/people/1" } },
      { meta: null },
    ];

    vi.mocked(mockLogFind.select).mockResolvedValue(mockLogs);

    const result = await requestsHistogramHandler();

    expect(result.totalRequests).toBe(2);
    expect(result.histogram).toHaveLength(2);
  });

  it("should calculate percentages correctly", async () => {
    const mockLogs = [
      { meta: { endpoint: "/api/sw/search" } },
      { meta: { endpoint: "/api/sw/search" } },
      { meta: { endpoint: "/api/sw/search" } },
      { meta: { endpoint: "/api/sw/people/1" } },
    ];

    vi.mocked(mockLogFind.select).mockResolvedValue(mockLogs);

    const result = await requestsHistogramHandler();

    expect(result.histogram[0]).toMatchObject({
      endpoint: "/api/sw/search",
      count: 3,
      percentage: 75,
    });

    expect(result.histogram[1]).toMatchObject({
      endpoint: "/api/sw/people/1",
      count: 1,
      percentage: 25,
    });
  });

  it("should use correct time period (last 24 hours)", async () => {
    const now = new Date("2024-01-01T12:00:00Z");
    vi.setSystemTime(now);

    vi.mocked(mockLogFind.select).mockResolvedValue([]);

    await requestsHistogramHandler();

    const expectedStartDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const expectedEndDate = now;

    expect(Log.find).toHaveBeenCalledWith({
      timestamp: {
        $gte: expectedStartDate,
        $lte: expectedEndDate,
      },
      "meta.endpoint": { $exists: true },
    });

    vi.useRealTimers();
  });

  it("should save result to MongoDB", async () => {
    const mockLogs = [{ meta: { endpoint: "/api/sw/search" } }];

    vi.mocked(mockLogFind.select).mockResolvedValue(mockLogs);

    const result = await requestsHistogramHandler();

    expect(mongoose.connection.collection).toHaveBeenCalledWith("requestsHistogram");
    expect(mockCollection.insertOne).toHaveBeenCalledWith(result);
  });

  it("should handle database errors gracefully", async () => {
    const mockLogs = [{ meta: { endpoint: "/api/sw/search" } }];

    vi.mocked(mockLogFind.select).mockResolvedValue(mockLogs);
    vi.mocked(mockCollection.insertOne).mockRejectedValue(new Error("Database error"));

    await expect(requestsHistogramHandler()).rejects.toThrow("Database error");
  });
});
