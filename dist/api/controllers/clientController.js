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
exports.addPessoa = exports.remove = exports.getAll = exports.getId = exports.update = exports.create = void 0;
// import { token } from "../Config/token";
const prisma_1 = __importDefault(require("../services/prisma"));
const error_1 = require("../entities/error");
const bcryptConfig_1 = __importDefault(require("../../Config/bcryptConfig"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //criando client
        const client = req.body;
        const { nm_pessoa, num_rg, num_cpf_cnpj, dt_nascimento, genero, num_contato, estado_civil, nacionalidade, reside_brasil, } = client;
        const newBody = req.body;
        // client
        const newClient = yield prisma_1.default.tb_pessoa.create({
            data: {
                nm_pessoa,
                num_rg,
                num_cpf_cnpj,
                dt_nascimento: new Date(dt_nascimento),
                genero,
                num_contato,
                estado_civil,
                nacionalidade,
                reside_brasil,
            },
        });
        // filtrando id para chave estrangeira para cadastrar usuario
        const filterUserId = yield prisma_1.default.tb_pessoa.findUnique({
            where: {
                id: newClient.id,
            },
            select: {
                id: true,
            },
        });
        // criando user
        // Pegando os dados do body
        const { usuario, email, senha, confirmSenha, pessoa_key } = req.body;
        // pegando dados do body e criando um novo objeto
        const data = {
            usuario,
            email,
            senha,
            confirmSenha,
            pessoa_key: filterUserId.id,
        };
        // Verifica se o usuario ja existe
        const userExists = yield prisma_1.default.tb_usuario.findFirst({
            where: {
                email: data.email,
            },
        });
        // validando Se o email ja existir retorna um erro
        if (userExists) {
            next(error_1.Error.badRequest("Email já existe"));
            return;
        }
        // Criptografa a senha
        const hash = yield (0, bcryptConfig_1.default)(data.senha);
        //criando um user para enviar para o BD sem a confirmSenha
        const user = {
            usuario: data.usuario,
            email: data.email,
            senha: hash,
            pessoa_key: filterUserId.id,
        };
        // Cria o usuario
        const newUser = yield prisma_1.default.tb_usuario.create({
            data: user,
        });
        res.status(201).json("Usuário criado com sucesso");
    }
    catch (err) {
        // next(Error.badRequest(err.message));
    }
});
exports.create = create;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const client = req.body;
        const updateClient = yield prisma_1.default.tb_pessoa.update({
            where: {
                id: Number(id),
            },
            data: {
                nm_pessoa: client.nm_pessoa,
                num_rg: client.num_rg,
                num_cpf_cnpj: client.num_cpf_cnpj,
                dt_nascimento: new Date(client.dt_nascimento),
                genero: client.genero,
                num_contato: client.num_contato,
                estado_civil: client.estado_civil,
                nacionalidade: client.nacionalidade,
                reside_brasil: client.reside_brasil,
            },
        });
        res
            .status(200)
            .json({ message: `O Cliente do id:${id} foi atualizado com sucesso!` });
    }
    catch (error) {
        next(error_1.Error.badRequest(error.message));
    }
});
exports.update = update;
const getId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const client = yield prisma_1.default.tb_pessoa.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!client) {
            next(error_1.Error.notFound(`Cliente do id: ${id} não encontrado!`));
            return;
        }
        return res.status(200).json(client);
    }
    catch (error) {
        next(error_1.Error.badRequest(error.message));
    }
});
exports.getId = getId;
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield prisma_1.default.tb_pessoa.findMany();
        res.status(200).json(client);
    }
    catch (error) {
        next(error_1.Error.badRequest(error.message));
    }
});
exports.getAll = getAll;
const remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const client = yield prisma_1.default.tb_pessoa.delete({
            where: {
                id: Number(id),
            },
        });
        res
            .status(200)
            .json({ message: `O Cliente do id:${id} foi deletado com sucesso!` });
    }
    catch (error) {
        next(error_1.Error.badRequest(error.message));
    }
});
exports.remove = remove;
const addPessoa = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const newBody = req.body;
        console.log(newBody);
        const newClient = yield prisma_1.default.tb_cliente.create({
            data: {
                hobbies: newBody.hobbies,
                fuma: newBody.fuma,
                registro_conducao: newBody.registro_conducao,
                pessoa_key: Number(id),
                faixa_renda: newBody.faixa_renda,
                politicamente_exposto: newBody.politicamente_exposto,
                vinculo_politicamente_exposto: newBody.vinculo_politicamente_exposto,
                risco_profissao: newBody.risco_profissao,
                profissao: newBody.profissao,
            },
        });
        res.status(201).json(newClient);
    }
    catch (error) {
        next(error_1.Error.badRequest(error.message));
    }
});
exports.addPessoa = addPessoa;
//# sourceMappingURL=clientController.js.map