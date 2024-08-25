import { Request, Response, NextFunction } from "express";
import { Model } from "mongoose";

export function MongoQuery(model: Model<any>) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        const documents = await model.find({ ...req.body });
        req.mongoQuery = documents;
      } catch (error) {
        console.error(`${(error as Error).message}`);
        return res.status(500).json(error);
      }
      return originalMethod.call(this, req, res, next);
    };
  };
}
