import { Request, Response, NextFunction } from "express";

export interface MoviesRequest extends Request {
  params: {
    id: string;
  };
}

export const validateMoviesRequest = (
  req: MoviesRequest,
  res: Response,
  next: NextFunction
): void => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      error: "ID parameter is required",
      message: "Please provide a movie ID",
    });
    return;
  }

  const movieId = Number(id);
  if (isNaN(movieId) || movieId <= 0) {
    res.status(400).json({
      error: "Invalid ID parameter",
      message: "ID must be a positive number",
    });
    return;
  }

  if (!Number.isInteger(movieId)) {
    res.status(400).json({
      error: "Invalid ID parameter",
      message: "ID must be an integer",
    });
    return;
  }

  next();
};
