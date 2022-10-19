import { Request, Response, NextFunction } from "express";
import { Client } from "../interfaces/client";
// import { token } from "../Config/token";
import prisma from "../services/prisma";
import { Error } from "../entities/error";
import { userClientScheme } from "../validations/userSchema";
import bcryptConfig from "../../Config/bcryptConfig";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //criando client
    const client: Client = req.body;

    const {
      nm_pessoa,
      num_rg,
      num_cpf_cnpj,
      dt_nascimento,
      genero,
      num_contato,
      estado_civil,
      nacionalidade,
      reside_brasil,
    } = client;

    const newBody = req.body;

    // client
    const newClient = await prisma.tb_pessoa.create({
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
    const filterUserId = await prisma.tb_pessoa.findUnique({
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
    const userExists = await prisma.tb_usuario.findFirst({
      where: {
        email: data.email,
      },
    });

    // validando Se o email ja existir retorna um erro
    if (userExists) {
      next(Error.badRequest("Email já existe"));
      return;
    }

    // Criptografa a senha
    const hash = await bcryptConfig(data.senha);

    //criando um user para enviar para o BD sem a confirmSenha
    const user = {
      usuario: data.usuario,
      email: data.email,
      senha: hash,
      pessoa_key: filterUserId.id,
    };

    // Cria o usuario
    const newUser = await prisma.tb_usuario.create({
      data: user,
    });

    res.status(201).json("Usuário criado com sucesso");
  } catch (err: any) {
    // next(Error.badRequest(err.message));
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const client: Client = req.body;

    const updateClient = await prisma.tb_pessoa.update({
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
  } catch (error: any) {
    next(Error.badRequest(error.message));
  }
};

export const getId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const client = await prisma.tb_pessoa.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!client) {
      next(Error.notFound(`Cliente do id: ${id} não encontrado!`));
      return;
    }

    return res.status(200).json(client);
  } catch (error: any) {
    next(Error.badRequest(error.message));
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const client = await prisma.tb_pessoa.findMany();
    res.status(200).json(client);
  } catch (error: any) {
    next(Error.badRequest(error.message));
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const client = await prisma.tb_pessoa.delete({
      where: {
        id: Number(id),
      },
    });
    res
      .status(200)
      .json({ message: `O Cliente do id:${id} foi deletado com sucesso!` });
  } catch (error: any) {
    next(Error.badRequest(error.message));
  }
};

export const addPessoa = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const newBody = req.body;

    console.log(newBody);

    const newClient = await prisma.tb_cliente.create({
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
  } catch (error: any) {
    next(Error.badRequest(error.message));
  }
};
