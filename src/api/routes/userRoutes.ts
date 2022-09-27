import { Router } from "express";
import { create, remove, getId } from "../controllers/userController";

// import clientSchema from "../validations/clientSchema";

const privateRoutes = Router();

//Crud de Users Rotas privadas
privateRoutes.get("/:id", getId);
privateRoutes.post("/add", create);
privateRoutes.delete("/:id", remove);

export default privateRoutes;
