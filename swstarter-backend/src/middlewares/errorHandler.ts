import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error("Error occurred:", error);

  // Handle not found errors
  if (error.message === "Person not found" || error.message === "Movie not found") {
    res.status(404).json({
      error: "Not found",
      message: error.message,
    });
    return;
  }

  // Handle MongoDB errors
  if (error.name === "MongoError" || error.name === "MongoServerError") {
    res.status(500).json({
      error: "Database error",
      message: "An error occurred while accessing the database",
    });
    return;
  }

  // Handle validation errors
  if (error.name === "ValidationError") {
    res.status(400).json({
      error: "Validation error",
      message: error.message,
    });
    return;
  }

  // Handle generic errors
  res.status(500).json({
    error: "Internal server error",
    message: "An unexpected error occurred",
  });
};
