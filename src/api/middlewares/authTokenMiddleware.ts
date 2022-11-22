import { Request, Response, NextFunction } from "express";
import { Error } from "../entities/error";
import { verify } from "jsonwebtoken";

// Tipagem do token
type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

export const authTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(Error.unauthorize("Token não informado"));
    return;
  }
  const [, token] = authorization.split(" ");

  try {
    const decoded = verify(token, process.env.SECRET_KEY);
    const { id } = decoded as TokenPayload;
    req.userId = id;
    next();
  } catch (err: any) {
    next(Error.badRequest(err.message));
  }
};
