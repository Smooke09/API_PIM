import { Router } from "express";
import {
  create,
  getAll,
  getId,
  update,
  remove,
} from "../controllers/clientController";
// import clientSchema from "../validations/clientSchema";

const clientRoutes = Router();

//Crud de Clientes
clientRoutes.get("/:id", getId);
clientRoutes.get("/", getAll);
clientRoutes.post("/add", create);
clientRoutes.put("/update/:id", update);
clientRoutes.delete("/delete/:id", remove);

export default clientRoutes;
