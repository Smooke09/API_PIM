import { Router } from "express";
import { remove, getId, update } from "../controllers/userController";

// import clientSchema from "../validations/clientSchema";

const privateRoutes = Router();

//Crud de Users Rotas privadas
privateRoutes.get("/:id", getId);
// Refatorar para atualizar pelo token do usuario
privateRoutes.put("/update/:id", update);
privateRoutes.delete("/:id", remove);

export default privateRoutes;
