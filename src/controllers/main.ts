import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/controller";
import { Route } from "../decorators/route";

@Controller()
class MainController {
  @Route("get", "/healthcheck")
  getHealthCheck(req: Request, res: Response, next: NextFunction) {
    console.info("🩺 HealthCheck called successfully!");
    return res.status(200).json({ status: "✅ Works fine!" });
  }
}

export default MainController;
