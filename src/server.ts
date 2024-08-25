import http from "http";
import express from "express";
import mongoose from "mongoose";
import { loggingHandler } from "./middleware/loggingHandler";
import { corsHandler } from "./middleware/corsHandler";
import { notFoundHandler } from "./middleware/notFoundHandler";
import { mongo, SERVER } from "./config/config";
import "reflect-metadata";
import { defineRoutes } from "./modules/routes";
import MainController from "./controllers/main";
import { declareHandler } from "./middleware/declareHandler";
import BooksController from "./controllers/book";

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = async () => {
  console.info("⏳ Initializing API");
  application.use(express.urlencoded({ extended: true }));
  application.use(express.json());

  console.info("🗃️ Connecting to Mongo...");
  try {
    const connection = await mongoose.connect(
      mongo.MONGO_CONNECTION,
      mongo.MONGO_OPTIONS
    );
    console.info(`✅ Connected to Mongo ${connection.version}`);
  } catch (error) {
    console.error(`👎 Cannot connect mongo: ${(error as Error).message}`);
  }

  console.log("👓 Loading Configs...");
  application.use(declareHandler);
  application.use(loggingHandler);
  application.use(corsHandler);

  console.info("🧮 Define Controller Routing");
  defineRoutes([MainController, BooksController], application);

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
