import { Router } from "express";
import {
  create,
  getAll,
  getId,
  update,
  remove,
} from "../controllers/clientController";

// import bodyValidationMiddleware from "../middlewares/bodyValidationMiddleware.ts";
// import clientSchema from "../validations/clientSchema";

const publicRoutes = Router();

//Crud de Clientes
publicRoutes.get("/:id", getId);
publicRoutes.get("/", getAll);
publicRoutes.post("/add", create);
publicRoutes.put("/:id", update);
publicRoutes.delete("/:id", remove);

export default publicRoutes;
