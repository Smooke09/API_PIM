import { Router } from "express";
import clientRoutes from "./clientRoutes";
import publicRoutes from "./publicRoutes";
import userRoutes from "./userRoutes";

const routes = Router();

// EndPoint: Todas as Rotas do Client
routes.use("/client", clientRoutes);
// EndPoint: Todas as Rotas do User
routes.use("/users", userRoutes);
// EndPoint: Todas as Rotas Publicas
routes.use("/public", publicRoutes);

export { routes };
