import express from "express";
import cors from "cors";
const path = require("path");
import options from "./cors";
import { routes } from "../routes/index";
import errorHandlerMiddleware from "../middlewares/errorHandlerMiddleware";
import * as dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

dotenv.config();
const server = express();

server.use(express.json());
server.use(cors(options));
server.use(express.urlencoded({ extended: false }));

const ROOT_FOLDER = path.join(__dirname, "..");
server.use(express.static(path.join(ROOT_FOLDER, "public")));

//End poitns

// server.use("/api", authTokenMiddleware, routes);
server.use("/api", routes);

const optionss = {
  customCssUrl: "/swagger-ui.css",
  customSiteTitle: "API AjudaJA swagger",
};

//Swagger
server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, optionss)
);

//Middleware error
server.use(errorHandlerMiddleware);

export default server;
