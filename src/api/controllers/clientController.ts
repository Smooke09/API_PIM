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
      return next(Error.badRequest("Email já existe"));
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

// Addicioanr a pessoa ao usuario
export const addPessoa = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  // Checando se ja existe formulario preenchido
  const checkUser = await prisma.tb_cliente.findFirst({
    where: {
      pessoa_key: Number(id),
    },
  });

  //Validando
  if (checkUser) {
    next(Error.badRequest("Formulario já preenchido, Aguarde a reposta"));
    return;
  }

  try {
    const {
      hobbies,
      fuma,
      registro_conducao,
      faixa_renda,
      politicamente_exposto,
      vinculo_politicamente_exposto,
      profissao,
      risco_profissao,
    } = req.body;

    const data = {
      hobbies,
      fuma,
      pessoa_key: Number(id),
      registro_conducao,
      faixa_renda,
      politicamente_exposto,
      vinculo_politicamente_exposto,
      profissao,
    };

    // const newClient = await prisma.tb_cliente.create({
    //   data,
    // });
    res.status(201).json(newClient);
  } catch (error: any) {
    next(Error.badRequest(error.message));
  }
};

// Pegando o formulario do cliente pelo id
export const getForm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const client = await prisma.tb_chamado.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        tb_cliente: true,
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

// Pegando todos os formularios
export const getAllForm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const client = await prisma.tb_chamado.findMany({
      include: {
        tb_cliente: true,
      },
    });

    res.status(200).json(client);
  } catch (error: any) {
    next(Error.badRequest(error.message));
  }
};

// Atualizando o formulario
export const updateForm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const {
      hobbies,
      fuma,
      registro_conducao,
      faixa_renda,
      politicamente_exposto,
      vinculo_politicamente_exposto,
      profissao,
      risco_profissao,
    } = req.body;

    const data = {
      hobbies,
      fuma,
      registro_conducao,
      faixa_renda,
      politicamente_exposto,
      vinculo_politicamente_exposto,
      profissao,
      risco_profissao,
    };

    const formUpdate = await prisma.tb_chamado.update({
      where: {
        id: Number(id),
      },
      data: {
        tb_cliente: {
          update: data,
        },
      },

      include: {
        tb_cliente: true,
      },
    });

    res.status(200).json({
      message: `O Formulario do id:${id} foi atualizado com sucesso!`,
      formUpdate,
    });
  } catch (error: any) {
    next(Error.badRequest(error.message));
  }
};

export const deleteForm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const client = await prisma.tb_chamado.delete({
      where: {
        id: Number(id),
      },
    });

    res
      .status(200)
      .json({ message: `O Formulario do id:${id} foi deletado com sucesso!` });
  } catch (error: any) {
    next(Error.badRequest(error.message));
  }
};
