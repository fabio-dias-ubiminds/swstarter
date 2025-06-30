import { describe, it, expect, vi, beforeEach } from "vitest";
import { Request, Response, NextFunction } from "express";
import { SwController } from "../../src/controllers/swController";
import { ISwService } from "../../src/services/ISwApiService";
import { LinkType } from "../../src/lib/types";

// Mock the service
const mockSwService: ISwService = {
  search: vi.fn(),
  getPerson: vi.fn(),
  getMovie: vi.fn(),
};

describe("SwController", () => {
  let controller: SwController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    controller = new SwController(mockSwService);
    mockRequest = {};
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    mockNext = vi.fn();
    vi.clearAllMocks();
  });

  describe("search", () => {
    it("should return search results", async () => {
      const mockResults = [{ id: 1, label: "Luke Skywalker", type: "people" as LinkType }];

      vi.mocked(mockSwService.search).mockResolvedValue(mockResults);

      mockRequest.query = { type: "people", term: "luke" };

      await controller.search(mockRequest as any, mockResponse as Response);

      expect(mockSwService.search).toHaveBeenCalledWith("people", "luke");
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockResults);
    });
  });

  describe("getPerson", () => {
    it("should return person data", async () => {
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

      vi.mocked(mockSwService.getPerson).mockResolvedValue(mockPerson);

      mockRequest.params = { id: "1" };

      await controller.getPerson(mockRequest as any, mockResponse as Response, mockNext);

      expect(mockSwService.getPerson).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockPerson);
    });

    it("should call next with error when service throws", async () => {
      const error = new Error("Person not found");
      vi.mocked(mockSwService.getPerson).mockRejectedValue(error);

      mockRequest.params = { id: "1" };

      await controller.getPerson(mockRequest as any, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe("getMovie", () => {
    it("should return movie data", async () => {
      const mockMovie = {
        id: 1,
        title: "A New Hope",
        openingCrawl: "It is a period of civil war...",
        characters: [],
      };

      vi.mocked(mockSwService.getMovie).mockResolvedValue(mockMovie);

      mockRequest.params = { id: "1" };

      await controller.getMovie(mockRequest as any, mockResponse as Response, mockNext);

      expect(mockSwService.getMovie).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockMovie);
    });

    it("should call next with error when service throws", async () => {
      const error = new Error("Movie not found");
      vi.mocked(mockSwService.getMovie).mockRejectedValue(error);

      mockRequest.params = { id: "1" };

      await controller.getMovie(mockRequest as any, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});
