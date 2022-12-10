import express from "express";
import cors from "cors";
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

//End poitns

// server.use("/api", authTokenMiddleware, routes);
server.use("/api", routes);

//Swagger
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Middleware error
server.use(errorHandlerMiddleware);

export default server;
