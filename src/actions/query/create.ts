import { PrismaClient } from "@prisma/client";

export const create = async (prisma: PrismaClient, model: string, data: unknown) => {
  return await prisma[model].create({ data });
};
