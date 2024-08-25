import { Request, Response, NextFunction } from "express";
import { Document } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      mongoGetAll: Document[];
      mongoGet: Document | undefined;
      mongoCreate: Document | undefined;
      mongoUpdate: Document | undefined;
      mongoQuery: Document[];
    }
  }
}

export function declareHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.mongoGetAll = [];
  req.mongoGet = undefined;
  req.mongoCreate = undefined;
  req.mongoUpdate = undefined;
  req.mongoQuery = [];

  next();
}
