import { Request, Response, NextFunction } from "express";

export const loggingHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(
    `➡ Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    console.log(
      `⬅ Incomming - STATUS: [${res.statusCode}] METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
};
