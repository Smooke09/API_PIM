import { Resquest, Response, NextFunction } from "express";
import { Client } from "../interfaces/client";
// import { token } from "../Config/token";
import prisma from "../services/prisma";
import { Error } from "../entities/error";

export const create = async (
  req: Resquest,
  res: Response,
  next: NextFunction
) => {
  try {
    const client: Client = req.body;
    const newClient = await prisma.tb_pessoa.create({ data: client });

    res.status(200).json({ message: "Cliente cadastrado com sucesso!" });
  } catch (error: any) {
    next(Error.badRequest(error.message));
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

    res.status(200).json(client);
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
