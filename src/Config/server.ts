import express from "express";
import cors from "cors";
import options from "./cors";
import { routes } from "../api/routes/index";
import errorHandlerMiddleware from "../api/middlewares/errorHandlerMiddleware";

const server = express();

server.use(express.json());
server.use(cors(options));
server.use(express.urlencoded({ extended: false }));

//End poitns
server.use("/api", routes);

server.use(errorHandlerMiddleware);

//MIddleware error
// server.use(errorHandlerMiddleware);

export default server;
