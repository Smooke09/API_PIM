"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const useLogin_1 = require("../useCases/useLogin");
const clientController_1 = require("../controllers/clientController");
const validationHandleMiddleware_1 = __importDefault(require("../middlewares/validationHandleMiddleware"));
const userSchema_1 = require("../validations/userSchema");
const publicRoutes = (0, express_1.Router)();
//EndPonts Publicos
publicRoutes.post("/login", useLogin_1.login);
publicRoutes.post("/add", (0, validationHandleMiddleware_1.default)(userSchema_1.userClientScheme), (0, validationHandleMiddleware_1.default)(userSchema_1.clientScheme), clientController_1.create);
exports.default = publicRoutes;
//# sourceMappingURL=publicRoutes.js.map