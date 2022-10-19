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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const prisma_1 = __importDefault(require("../services/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_1 = require("../entities/error");
const jsonwebtoken_1 = require("jsonwebtoken");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, email, senha } = req.body;
        // Verificando se o usuario existe
        const user = yield prisma_1.default.tb_usuario.findFirst({
            where: {
                email: email,
            },
        });
        // Se o email nao existir retorna um erro
        if (!user) {
            next(error_1.Error.badRequest("Email nao encontrado"));
            return;
        }
        else {
            // Verificando se a senha esta correta
            const isPasswordCorrect = yield bcrypt_1.default.compare(senha, user.senha);
            if (!isPasswordCorrect) {
                next(error_1.Error.badRequest("Senha incorreta"));
                return;
            }
        }
        // Gerando o token
        const token = (0, jsonwebtoken_1.sign)({ id: user.id }, process.env.SECRET_KEY, {
            expiresIn: "1h",
        });
        // Se tudo estiver correto retorna o usuario
        res.status(200).json({
            message: "Login realizado com sucesso",
            user: { id: user.id, email: user.email },
            token: token,
        });
    }
    catch (err) {
        next(error_1.Error.badRequest(err.message));
    }
});
exports.login = login;
//# sourceMappingURL=useLogin.js.map