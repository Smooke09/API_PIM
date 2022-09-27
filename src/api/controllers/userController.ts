import { Request, Response, NextFunction } from "express";
import { userClientScheme } from "../validations/userSchema";
import prisma from "../services/prisma";
import bcryptConfig from "../../Config/bcryptConfig";
import { Error } from "../entities/error";

// Funcao de Criar um usuario
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Pegando os dados do body
    const user = req.body;

    // Validacao do Yup
    await userClientScheme.validate(user, { abortEarly: false });

    // Verifica se o usuario ja existe
    const userExists = await prisma.tb_usuario.findFirst({
      where: {
        email: user.email,
      },
    });

    // validando Se o email ja existir retorna um erro
    if (userExists) {
      next(Error.badRequest("Email já existe"));
      return;
    }

    // Criptografa a senha
    const hash = await bcryptConfig(user.senha);

    // Cria o usuario
    const newUser = await prisma.tb_usuario.create({
      data: { ...user, senha: hash },
    });
    res.status(201).json("Usuário criado com sucesso");
  } catch (err: any) {
    next(Error.badRequest(err.message));
  }
};

// Editando um usuario
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = req.body;

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
    } else {
      // Se o usuario existir
      const userUpdate = await prisma.tb_usuario.update({
        where: {
          id: Number(id),
        },
        data: user,
      });
    }
  } catch (err: any) {
    next(Error.badRequest(err.message));
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
