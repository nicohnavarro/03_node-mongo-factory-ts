import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new Error("Route Not Found");
  console.error(`❌ ${error.message}`, error.name);
  return res.status(404).json({ error: error.message });
};
