import e, { Request, Response, NextFunction } from "express";
import { Client } from "../interfaces/client";
import prisma from "../services/prisma";
import { Error } from "../entities/error";
import bcryptConfig from "../Config/bcryptConfig";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //criando client
    const client = req.body;

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

    const client = req.body;

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

export const updatePessoa = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

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

    const updatePessoa = await prisma.tb_cliente.update({
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
  } catch (error: any) {
    next(Error.badRequest(error.message));
  }
};

// Addicioanr a pessoa ao usuario
export const addForm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    const newClient = await prisma.tb_cliente.create({
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
      next(Error.badRequest("Erro ao criar cliente"));
      return;
    }

    const newChamado = await prisma.tb_chamado.create({
      data: {
        cliente_id: newClient.id,
        funcionario_resp,
        status,
      },
    });

    res.status(201).json(newChamado);
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
    if (!id) {
      next(Error.badRequest("Id não informado"));
      return;
    }

    const client = await prisma.tb_cliente.findFirst({
      where: {
        id: Number(id),
      },

      select: {
        id: true,
        hobbies: true,
        fuma: true,
        registro_conducao: true,
        faixa_renda: true,
        politicamente_exposto: true,
        vinculo_politicamente_exposto: true,
        profissao: true,
        risco_profissao: true,

        tb_pessoa: {
          select: {
            nm_pessoa: true,
            num_rg: true,
            num_cpf_cnpj: true,
            genero: true,
            dt_nascimento: true,
            num_contato: true,
            reside_brasil: true,
            nacionalidade: true,
          },
        },
        tb_chamado: true,
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
      select: {
        id: true,
        cliente_id: true,
        funcionario_resp: true,
        status: true,
        tb_cliente: {
          select: {
            id: true,
            hobbies: true,
            fuma: true,
            registro_conducao: true,
            faixa_renda: true,
            politicamente_exposto: true,
            vinculo_politicamente_exposto: true,
            profissao: true,
            risco_profissao: true,
            tb_pessoa: {
              select: {
                nm_pessoa: true,
                num_rg: true,
                num_cpf_cnpj: true,
                genero: true,
                dt_nascimento: true,
                num_contato: true,
                reside_brasil: true,
                nacionalidade: true,
              },
            },
          },
        },
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
    const { status, data, funcionario_resp } = req.body;

    const formUpdate = await prisma.tb_chamado.update({
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
