import express from "express";
import cors from "cors";
import options from "./cors";
import { routes } from "../api/routes/index";

const server = express();

server.use(express.json());
server.use(cors(options));
server.use(express.urlencoded({ extended: false }));

//End poitns
server.use("/api", routes);

//MIddleware error
// server.use(errorHandlerMiddleware);

export default server;
