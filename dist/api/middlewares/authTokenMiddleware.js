"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authTokenMiddleware = void 0;
const error_1 = require("../entities/error");
const jsonwebtoken_1 = require("jsonwebtoken");
const authTokenMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization) {
        next(error_1.Error.unauthorized("Token não informado"));
        return;
    }
    const [, token] = authorization.split(" ");
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.SECRET_KEY);
        const { id } = decoded;
        req.userId = id;
        next();
    }
    catch (err) {
        next(error_1.Error.badRequest(err.message));
    }
});
exports.authTokenMiddleware = authTokenMiddleware;
//# sourceMappingURL=authTokenMiddleware.js.map