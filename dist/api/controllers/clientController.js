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
exports.deleteForm = exports.updateForm = exports.getAllForm = exports.getForm = exports.addForm = exports.updatePessoa = exports.remove = exports.getAll = exports.getId = exports.update = exports.create = void 0;
// import { token } from "../Config/token";
const prisma_1 = __importDefault(require("../services/prisma"));
const error_1 = require("../entities/error");
const bcryptConfig_1 = __importDefault(require("../../Config/bcryptConfig"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //criando client
        const client = req.body;
        const { nm_pessoa, num_rg, num_cpf_cnpj, dt_nascimento, genero, num_contato, estado_civil, nacionalidade, reside_brasil, } = client;
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
            return next(error_1.Error.badRequest("Email já existe"));
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
        next(error_1.Error.badRequest(err.message));
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
                num_contato: client.num_contato,
                estado_civil: client.estado_civil,
                // reside_brasil: client.reside_brasil,
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
const updatePessoa = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { hobbies, fuma, registro_conducao, faixa_renda, politicamente_exposto, vinculo_politicamente_exposto, profissao, risco_profissao, } = req.body;
        const updatePessoa = yield prisma_1.default.tb_cliente.update({
            where: {
                id: Number(id),
            },
            data: {
                hobbies: hobbies,
                fuma: fuma,
                registro_conducao: registro_conducao,
                faixa_renda: faixa_renda,
                politicamente_exposto,
                vinculo_politicamente_exposto,
                profissao,
                risco_profissao,
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
exports.updatePessoa = updatePessoa;
// Addicioanr a pessoa ao usuario
const addForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const { id } = req.params;
    // Checando se ja existe formulario preenchido
    try {
        const { client, funcionario_resp, status, pessoa_key } = req.body;
        // const checkForm = await prisma.tb_chamado.findFirst({
        //   where: {
        //     cliente_id: pessoa_key,
        //   },
        // });
        // if (checkForm) {
        //   return next(Error.badRequest("Formulario já preenchido"));
        // }
        const newClient = yield prisma_1.default.tb_cliente.create({
            data: {
                hobbies: req.body.hobbies,
                fuma: req.body.fuma,
                registro_conducao: req.body.registro_conducao,
                pessoa_key: req.body.pessoa_key,
                faixa_renda: req.body.faixa_renda,
                politicamente_exposto: req.body.politicamente_exposto,
                vinculo_politicamente_exposto: req.body.vinculo_politicamente_exposto,
                risco_profissao: req.body.risco_profissao,
                profissao: req.body.profissao,
            },
        });
        if (!newClient) {
            next(error_1.Error.badRequest("Erro ao criar cliente"));
            return;
        }
        const newChamado = yield prisma_1.default.tb_chamado.create({
            data: {
                cliente_id: newClient.id,
                funcionario_resp,
                status,
            },
        });
        res.status(201).json(newChamado);
    }
    catch (error) {
        next(error_1.Error.badRequest(error.message));
    }
});
exports.addForm = addForm;
// Pegando o formulario do cliente pelo id
const getForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id) {
            next(error_1.Error.badRequest("Id não informado"));
            return;
        }
        const client = yield prisma_1.default.tb_cliente.findFirst({
            where: {
                id: Number(id),
            },
            include: {
                tb_chamado: true,
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
exports.getForm = getForm;
// Pegando todos os formularios
const getAllForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield prisma_1.default.tb_chamado.findMany({
            include: {
                tb_cliente: true,
            },
        });
        res.status(200).json(client);
    }
    catch (error) {
        next(error_1.Error.badRequest(error.message));
    }
});
exports.getAllForm = getAllForm;
// Atualizando o formulario
const updateForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { status, data, funcionario_resp } = req.body;
        const formUpdate = yield prisma_1.default.tb_chamado.update({
            where: {
                id: Number(id),
            },
            data: {
                status,
                data,
                funcionario_resp,
            },
        });
        res.status(200).json({
            message: `O Formulario do id:${id} foi atualizado com sucesso!`,
            formUpdate,
        });
    }
    catch (error) {
        next(error_1.Error.badRequest(error.message));
    }
});
exports.updateForm = updateForm;
const deleteForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const client = yield prisma_1.default.tb_chamado.delete({
            where: {
                id: Number(id),
            },
        });
        res
            .status(200)
            .json({ message: `O Formulario do id:${id} foi deletado com sucesso!` });
    }
    catch (error) {
        next(error_1.Error.badRequest(error.message));
    }
});
exports.deleteForm = deleteForm;
//# sourceMappingURL=clientController.js.map