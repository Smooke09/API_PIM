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
      genero,
      num_contato,
      estado_civil,
      nacionalidade,
      reside_brasil,
    } = client;

    const newBody = req.body;

    if (newBody.email === undefined || newBody.email === "") {
      next(Error.badRequest("Email não pode ser vazio"));
      return;
    }

    // client
    const newClient = await prisma.tb_pessoa.create({
      data: {
        nm_pessoa,
        num_rg,
        num_cpf_cnpj,
        genero,
        num_contato,
        estado_civil,
        nacionalidade,
        reside_brasil,
      },
    });

    // filtranod id para chave estrangeira
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

    // Validacao do Yup
    await userClientScheme.validate(data, { abortEarly: false });

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
    next(Error.badRequest(err.message));
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
      data: client,
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
