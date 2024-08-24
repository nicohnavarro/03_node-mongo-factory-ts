import http from "http";
import express from "express";
import { loggingHandler } from "./middleware/loggingHandler";
import { corsHandler } from "./middleware/corsHandler";
import { notFoundHandler } from "./middleware/notFoundHandler";
import { SERVER } from "./config/config";

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
  console.info("⏳ Initializing API");
  application.use(express.urlencoded({ extended: true }));
  application.use(express.json());

  console.log("👓 Loading Configs...");
  application.use(loggingHandler);
  application.use(corsHandler);

  console.info("🧮 Define Controller Routing");
  application.get("/main/healthcheck", (req, res, next) => {
    return res.status(200).json({ status: "✅ Works fine!" });
  });
  application.use(notFoundHandler);

  httpServer = http.createServer(application);
  httpServer.listen(SERVER.SERVER_PORT, () => {
    console.info(
      `⚡️ Server Started: ${SERVER.SERVER_HOSTNAME}: ${SERVER.SERVER_PORT}`
    );
  });
};

export const Shutdown = (callback: any) =>
  httpServer && httpServer.close(callback);

Main();
