import { Router } from "express";
import {
  create,
  getAll,
  getId,
  update,
  remove,
  addForm,
  getForm,
  getAllForm,
  updateForm,
  deleteForm,
  updatePessoa,
} from "../controllers/clientController";

const clientRoutes = Router();

//Crud de Clientes
clientRoutes.get("/:id", getId);
clientRoutes.get("/", getAll);
clientRoutes.put("/update/:id", update);
clientRoutes.delete("/delete/:id", remove);
clientRoutes.post("/create", create);

// Pessoa Fisica
clientRoutes.put("/pessoa/update/:id", updatePessoa);

//Crud de Formulario
clientRoutes.get("/form/get/all", getAllForm);
clientRoutes.get("/form/unity/:id", getForm);
clientRoutes.post("/form/create", addForm);
clientRoutes.patch("/form/:id", updateForm);
clientRoutes.delete("/form/:id", deleteForm);

export default clientRoutes;
