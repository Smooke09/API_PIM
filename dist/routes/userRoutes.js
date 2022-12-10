"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
// import clientSchema from "../validations/clientSchema";
const privateRoutes = (0, express_1.Router)();
//Crud de Users Rotas privadas
privateRoutes.get("/:id", userController_1.getId);
// Refatorar para atualizar pelo token do usuario
privateRoutes.put("/update/:id", userController_1.update);
privateRoutes.delete("/:id", userController_1.remove);
exports.default = privateRoutes;
//# sourceMappingURL=userRoutes.js.map