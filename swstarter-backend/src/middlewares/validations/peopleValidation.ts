import { Request, Response, NextFunction } from "express";

export interface PeopleRequest extends Request {
  params: {
    id: string;
  };
}

export const validatePeopleRequest = (
  req: PeopleRequest,
  res: Response,
  next: NextFunction
): void => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      error: "ID parameter is required",
      message: "Please provide a person ID",
    });
    return;
  }

  const personId = Number(id);
  if (isNaN(personId) || personId <= 0) {
    res.status(400).json({
      error: "Invalid ID parameter",
      message: "ID must be a positive number",
    });
    return;
  }

  if (!Number.isInteger(personId)) {
    res.status(400).json({
      error: "Invalid ID parameter",
      message: "ID must be an integer",
    });
    return;
  }

  next();
};
