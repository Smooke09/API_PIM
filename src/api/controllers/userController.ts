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
    const data = {
      usuario,
      email,
      senha,
      confirmSenha,
    };

    // Validacao do Yup
    await userClientScheme.validate(data, { abortEarly: false });

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
    } else if (userExists?.email !== data.email) {
      //Nao deixar trocar o email
      next(Error.badRequest("Não é possivel trocar o email"));
      return;
    } else {
      // se o usuario existir e o email for o mesmo

      // Criptografa a senha
      const hash = await bcryptConfig(data.senha);
      const user = {
        usuario: data.usuario,
        senha: hash,
      };
      // Atualiza o usuario
      const userUpdate = await prisma.tb_usuario.update({
        where: {
          id: Number(id),
        },
        data: user,
      });
    }
    res.status(200).json("Usuário atualizado com sucesso");
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
