import { Resquest, Response, NextFunction } from "express";
import { token } from "../Config/token";


export class UserController {
  public static async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    res.send("Hello World");
  }
}
