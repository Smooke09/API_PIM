import express from "express";
import cors from "cors";
import options from "./cors";
import { routes } from "../api/routes/index";
import errorHandlerMiddleware from "../api/middlewares/errorHandlerMiddleware";
import { authTokenMiddleware } from "../api/middlewares/authTokenMiddleware";
import * as dotenv from "dotenv";

dotenv.config();
const server = express();

server.use(express.json());
server.use(cors(options));
server.use(express.urlencoded({ extended: false }));

//End poitns
server.use("/api", routes);

//Middleware error
server.use(errorHandlerMiddleware);

export default server;
