import { Router } from "express";
import {
  create,
  getAll,
  getId,
  update,
  remove,
  addPessoa,
  getForm,
  getAllForm,
  updateForm,
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
clientRoutes.get("/form/all", getAllForm);
clientRoutes.patch("/form/:id", updateForm);
clientRoutes.get("/form/:id", getForm);

export default clientRoutes;
