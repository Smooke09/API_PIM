import { Router } from "express";
import { UserController } from "../controllers/userController";

// import bodyValidationMiddleware from "../middlewares/bodyValidationMiddleware.ts";
// import clientSchema from "../validations/clientSchema";

const publicRoutes = Router();

publicRoutes.get("/:id", UserController.getUsers);

export default publicRoutes;
