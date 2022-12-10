"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const clientRoutes_1 = __importDefault(require("./clientRoutes"));
const publicRoutes_1 = __importDefault(require("./publicRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const routes = (0, express_1.Router)();
exports.routes = routes;
// EndPoint: Todas as Rotas do Client
routes.use("/client", clientRoutes_1.default);
// EndPoint: Todas as Rotas do User
routes.use("/users", userRoutes_1.default);
// EndPoint: Todas as Rotas Publicas
routes.use("/public", publicRoutes_1.default);
//# sourceMappingURL=index.js.map