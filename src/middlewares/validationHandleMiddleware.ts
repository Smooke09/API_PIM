import yup from "yup";
import { Response, Request, NextFunction } from "express";
import { Error } from "../entities/error";

const bodyValidation =
  (schema: yup.AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      await schema.validate(body);

      next();
    } catch (e: any) {
      next(Error.unauthorize(e.message));
    }
  };

export default bodyValidation;
