import { Request, Response, NextFunction } from "express";

export interface SearchRequest extends Request {
  query: {
    type: string;
    term: string;
  };
}

export const validateSearchRequest = (
  req: SearchRequest,
  res: Response,
  next: NextFunction
): void => {
  const { type, term } = req.query;

  // Validate type parameter
  if (!type) {
    res.status(400).json({
      error: "Type parameter is required",
      message: "Please provide a type parameter (people or movies)",
    });
    return;
  }

  if (type !== "people" && type !== "movies") {
    res.status(400).json({
      error: "Invalid type parameter",
      message: "Type must be either 'people' or 'movies'",
    });
    return;
  }

  if (!term) {
    res.status(400).json({
      error: "Term parameter is required",
      message: "Please provide a search term",
    });
    return;
  }

  if (typeof term !== "string" || term.trim().length === 0) {
    res.status(400).json({
      error: "Invalid term parameter",
      message: "Term must be a non-empty string",
    });
    return;
  }

  next();
};
