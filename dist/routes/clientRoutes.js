"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientController_1 = require("../controllers/clientController");
const clientRoutes = (0, express_1.Router)();
//Crud de Clientes
clientRoutes.get("/:id", clientController_1.getId);
clientRoutes.get("/", clientController_1.getAll);
clientRoutes.put("/update/:id", clientController_1.update);
clientRoutes.delete("/delete/:id", clientController_1.remove);
clientRoutes.post("/create", clientController_1.create);
// Pessoa Fisica
clientRoutes.put("/pessoa/update/:id", clientController_1.updatePessoa);
//Crud de Formulario
clientRoutes.get("/form/get/all", clientController_1.getAllForm);
clientRoutes.get("/form/unity/:id", clientController_1.getForm);
clientRoutes.post("/form/create", clientController_1.addForm);
clientRoutes.patch("/form/:id", clientController_1.updateForm);
clientRoutes.delete("/form/:id", clientController_1.deleteForm);
exports.default = clientRoutes;
//# sourceMappingURL=clientRoutes.js.map