import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/controller";
import { Route } from "../decorators/route";
import Joi from "joi";
import { Validate } from "../decorators/validate";

const postHealthCheckValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email()
});

@Controller()
class MainController {
  @Route("get", "/healthcheck")
  getHealthCheck(req: Request, res: Response, next: NextFunction) {
    console.info("🩺 HealthCheck called successfully!");
    return res.status(200).json({ status: "✅ Works fine!" });
  }

  @Route("post", "/healthcheck")
  @Validate(postHealthCheckValidation)
  postHealthCheck(req: Request, res: Response, next: NextFunction) {
    console.info("🩺 HealthCheck called successfully!");
    return res.status(200).json({ ...req.body });
  }
}

export default MainController;
