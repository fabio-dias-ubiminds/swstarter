import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { SwApiService } from "../../src/services/swApiService";
import { cacheService } from "../../src/services/cacheService";

// Mock fetch globally
global.fetch = vi.fn();

// Mock cache service
vi.mock("../../src/services/cacheService", () => ({
  cacheService: {
    get: vi.fn(),
    set: vi.fn(),
    generateKey: vi.fn(),
  },
}));

describe("SwApiService", () => {
  let swApiService: SwApiService;

  beforeEach(() => {
    swApiService = new SwApiService();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("search", () => {
    it("should return cached results if available", async () => {
      const mockCachedResults = [{ id: 1, label: "Luke Skywalker", type: "people" as const }];

      vi.mocked(cacheService.get).mockResolvedValue(mockCachedResults);
      vi.mocked(cacheService.generateKey).mockReturnValue("search:people:luke");

      const result = await swApiService.search("people", "luke");

      expect(cacheService.get).toHaveBeenCalledWith(expect.stringContaining("search:people:luke"));
      expect(result).toEqual(mockCachedResults);
    });

    it("should filter results correctly when not cached", async () => {
      const mockPeople = [
        { url: "https://swapi.dev/api/people/1/", name: "Luke Skywalker", id: 1 },
        { url: "https://swapi.dev/api/people/2/", name: "Darth Vader", id: 2 },
      ];

      vi.mocked(cacheService.get).mockResolvedValue(null);
      vi.mocked(cacheService.generateKey).mockReturnValue("search:people:luke");
      vi.mocked(fetch).mockResolvedValue({
        json: () => Promise.resolve(mockPeople),
      } as Response);

      const result = await swApiService.search("people", "luke");

      expect(result).toHaveLength(1);
      expect(result[0].label).toBe("Luke Skywalker");
    });
  });

  describe("getPerson", () => {
    it("should return cached person if available", async () => {
      const mockPerson = {
        id: 1,
        name: "Luke Skywalker",
        birthYear: "19BBY",
        gender: "male",
        eyeColor: "blue",
        hairColor: "blond",
        height: 172,
        mass: 77,
        movies: [],
      };

      vi.mocked(cacheService.get).mockResolvedValue(mockPerson);
      vi.mocked(cacheService.generateKey).mockReturnValue("person:1");

      const result = await swApiService.getPerson(1);

      expect(cacheService.set).toHaveBeenCalledTimes(0);
      expect(result).toEqual(mockPerson);
    });

    it("should throw error for non-existent person", async () => {
      vi.mocked(cacheService.get).mockResolvedValue(null);
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
      } as Response);

      await expect(swApiService.getPerson(999)).rejects.toThrow("Person not found");
    });
  });

  describe("getMovie", () => {
    it("should return cached movie if available", async () => {
      const mockMovie = {
        id: 1,
        title: "A New Hope",
        openingCrawl: "It is a period of civil war...",
        characters: [],
      };

      vi.mocked(cacheService.get).mockResolvedValue(mockMovie);

      const result = await swApiService.getMovie(1);

      expect(result).toEqual(mockMovie);
    });

    it("should throw error for non-existent movie", async () => {
      vi.mocked(cacheService.get).mockResolvedValue(null);
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
      } as Response);

      await expect(swApiService.getMovie(999)).rejects.toThrow("Movie not found");
    });
  });
});
