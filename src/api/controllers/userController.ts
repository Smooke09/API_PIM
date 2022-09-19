import { Request, Response, NextFunction } from "express";
/* import { token } from "../Config/token"; */
import { prisma, PrismaClient } from "@prisma/client";
import { Client } from "../interfaces/client";

const Prisma = new PrismaClient();

export class UserController {
  public static async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    res.status(200).json({ message: "ok" });
  }
}
