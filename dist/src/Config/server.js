"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path = require("path");
const cors_2 = __importDefault(require("./cors"));
const index_1 = require("../routes/index");
const errorHandlerMiddleware_1 = __importDefault(require("../middlewares/errorHandlerMiddleware"));
const dotenv = __importStar(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
dotenv.config();
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use((0, cors_1.default)(cors_2.default));
server.use(express_1.default.urlencoded({ extended: false }));
const ROOT_FOLDER = path.join(__dirname, "..");
server.use(express_1.default.static(path.join(ROOT_FOLDER, "public")));
//End poitns
// server.use("/api", authTokenMiddleware, routes);
server.use("/api", index_1.routes);
const optionss = {
    customCssUrl: "/swagger-ui.css",
    customSiteTitle: "API AjudaJA swagger",
};
//Swagger
server.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default, optionss));
//Middleware error
server.use(errorHandlerMiddleware_1.default);
exports.default = server;
//# sourceMappingURL=server.js.map