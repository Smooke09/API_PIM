import { Request, Response, NextFunction } from "express";
import prisma from "../services/prisma";
import bcrypt from "bcrypt";
import { Error } from "../entities/error";
import { sign } from "jsonwebtoken";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, email, senha } = req.body;

    // Verificando se o usuario existe
    const user = await prisma.tb_usuario.findFirst({
      where: {
        email: email,
      },

      include: {
        tb_pessoa: true,
      },
    });

    const newCliente = await prisma.tb_pessoa.findFirst({
      where: {
        id: Number(user.pessoa_key),
      },

      include: {
        tb_cliente: true,
      },
    });

    // Se o email nao existir retorna um erro
    if (!user) {
      next(Error.badRequest("Email nao encontrado"));
      return;
    } else {
      // Verificando se a senha esta correta
      const isPasswordCorrect = await bcrypt.compare(senha, user.senha);

      if (!isPasswordCorrect) {
        return next(Error.badRequest("Senha incorreta"));
      }
    }

    // Gerando o token
    const token = sign({ id: user!.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    // Se tudo estiver correto retorna o usuario
    res.status(200).json({
      message: "Login realizado com sucesso",
      user: {
        id: user.id,
        email: user.email,
        id_pessoa: newCliente?.tb_cliente[0]?.id,
      },
      token: token,
    });
  } catch (err: any) {
    next(Error.badRequest(err.message));
  }
};
