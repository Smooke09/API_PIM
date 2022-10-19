import { Router } from "express";
import {
  create,
  getAll,
  getId,
  update,
  remove,
  addPessoa,
} from "../controllers/clientController";
// import clientSchema from "../validations/clientSchema";

const clientRoutes = Router();

//Crud de Clientes
clientRoutes.get("/:id", getId);
clientRoutes.get("/", getAll);
clientRoutes.put("/update/:id", update);
clientRoutes.delete("/delete/:id", remove);
clientRoutes.post("/create", create);
clientRoutes.post("/form/create/:id", addPessoa);

export default clientRoutes;
