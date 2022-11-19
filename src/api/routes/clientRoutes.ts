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

//Crud de Formulario
clientRoutes.get("/form/get/all", getAllForm);
clientRoutes.get("/form/unity/:id", getForm);
clientRoutes.post("/form/create/:id", addPessoa);
clientRoutes.patch("/form/:id", updateForm);

export default clientRoutes;
