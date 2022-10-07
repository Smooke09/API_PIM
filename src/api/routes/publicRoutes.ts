import { Router } from "express";
import { login } from "../useCases/useLogin";
import { create } from "../controllers/clientController";
import bodyValidation from "../middlewares/validationHandleMiddleware";
import { userClientScheme, clientScheme } from "../validations/userSchema";

const publicRoutes = Router();

//EndPonts Publicos
publicRoutes.post("/login", login);
publicRoutes.post(
  "/add",
  bodyValidation(userClientScheme),
  bodyValidation(clientScheme),
  create
);

export default publicRoutes;
