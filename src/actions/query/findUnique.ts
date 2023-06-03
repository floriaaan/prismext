import { PrismaClient } from "@prisma/client";

export const findUnique = async (prisma: PrismaClient, model: string, params: { [key: string]: string }) => {
  const { id } = params;
  return await prisma[model].findUnique({ where: { id: Number(id) } });
};
