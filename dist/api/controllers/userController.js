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
exports.remove = exports.getId = exports.update = void 0;
const prisma_1 = __importDefault(require("../services/prisma"));
const bcryptConfig_1 = __importDefault(require("../../Config/bcryptConfig"));
const error_1 = require("../entities/error");
// Editando um usuario
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { usuario, email, senha, confirmSenha } = req.body;
        // pegando dados do body e criando um novo objeto
        // Verifica se o usuario existe
        const userExists = yield prisma_1.default.tb_usuario.findFirst({
            where: {
                id: Number(id),
            },
        });
        // se o usuario nao existir retorna um erro
        if (!userExists) {
            next(error_1.Error.badRequest("Usuário não existe"));
            return;
        }
        else if (senha) {
            // Criptografa a senha
            const hash = yield (0, bcryptConfig_1.default)(senha);
            req.body.senha = hash;
        }
        const user = {
            usuario: usuario,
            senha,
        };
        // Atualiza o usuario
        const userUpdated = yield prisma_1.default.tb_usuario.update({
            where: {
                id: Number(id),
            },
            data: user,
        });
        console.log(userUpdated);
        // Retorna o usuario atualizado
        res.status(200).json("Usuário atualizado com sucesso");
    }
    catch (err) {
        next(error_1.Error.badRequest(err.message));
        console.log(err);
        return;
    }
});
exports.update = update;
// Busca um usuario pelo id
const getId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Verifica se o usuario existe
        const userExists = yield prisma_1.default.tb_usuario.findFirst({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                usuario: true,
                email: true,
                senha: true,
                pessoa_key: true,
                tb_pessoa: {
                    select: {
                        nm_pessoa: true,
                        num_rg: true,
                        num_cpf_cnpj: true,
                        dt_nascimento: true,
                        genero: true,
                        num_contato: true,
                        estado_civil: true,
                        nacionalidade: true,
                        reside_brasil: true,
                    },
                },
            },
        });
        if (userExists) {
            res.status(200).json(userExists);
        }
        else {
            next(error_1.Error.badRequest("Usuário não existe"));
            return;
        }
    }
    catch (err) {
        next(error_1.Error.badRequest(err.message));
        return;
    }
});
exports.getId = getId;
// Remove um usuario
const remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Verifica se o usuario existe
        const userExists = yield prisma_1.default.tb_usuario.findFirst({
            where: {
                id: Number(id),
            },
        });
        if (userExists) {
            // Deleta o usuario
            yield prisma_1.default.tb_usuario.delete({
                where: {
                    id: Number(id),
                },
            });
            res.status(200).json("Usuário deletado com sucesso");
        }
        else {
            next(error_1.Error.badRequest("Usuário não existe"));
            return;
        }
    }
    catch (err) {
        next(error_1.Error.badRequest(err.message));
        return;
    }
});
exports.remove = remove;
//# sourceMappingURL=userController.js.map