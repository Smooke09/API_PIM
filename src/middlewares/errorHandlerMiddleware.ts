import { Response, Request, NextFunction } from "express";
import { Error } from "../entities/error";

const errorHandlerMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  if (error) {
    return res.status(error.code).json(error.message);
  }

  return res.status(500).json({ message: "Internal Server Error" });
};

export default errorHandlerMiddleware;
