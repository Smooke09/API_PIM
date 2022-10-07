import { Request, Response, NextFunction } from "express";
import { userClientScheme } from "../validations/userSchema";
import prisma from "../services/prisma";
import bcryptConfig from "../../Config/bcryptConfig";
import { Error } from "../entities/error";

// Editando um usuario
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { usuario, email, senha, confirmSenha } = req.body;

    // pegando dados do body e criando um novo objeto

    // Verifica se o usuario existe
    const userExists = await prisma.tb_usuario.findFirst({
      where: {
        id: Number(id),
      },
    });

    // se o usuario nao existir retorna um erro
    if (!userExists) {
      next(Error.badRequest("Usuário não existe"));
      return;
    } else if (senha) {
      // Criptografa a senha
      const hash = await bcryptConfig(senha);
      req.body.senha = hash;
    }
    
    const user = {
      usuario: usuario,
      senha,
    };

    // Atualiza o usuario
    const userUpdated = await prisma.tb_usuario.update({
      where: {
        id: Number(id),
      },
      data: user,
    });

    console.log(userUpdated);

    // Retorna o usuario atualizado
    res.status(200).json("Usuário atualizado com sucesso");
  } catch (err: any) {
    next(Error.badRequest(err.message));
    console.log(err);
    return;
  }
};

// Busca um usuario pelo id
export const getId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // Verifica se o usuario existe
    const userExists = await prisma.tb_usuario.findFirst({
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
    } else {
      next(Error.badRequest("Usuário não existe"));
      return;
    }
  } catch (err: any) {
    next(Error.badRequest(err.message));
    return;
  }
};

// Remove um usuario
export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    // Verifica se o usuario existe
    const userExists = await prisma.tb_usuario.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (userExists) {
      // Deleta o usuario
      await prisma.tb_usuario.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json("Usuário deletado com sucesso");
    } else {
      next(Error.badRequest("Usuário não existe"));
      return;
    }
  } catch (err: any) {
    next(Error.badRequest(err.message));
    return;
  }
};
