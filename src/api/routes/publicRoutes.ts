import { Router } from "express";
import { login } from "../useCases/useLogin";

const publicRoutes = Router();

//EndPonts Publicos
publicRoutes.post("/login", login);


export default publicRoutes;
