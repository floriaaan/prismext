import { PrismaClient } from "@prisma/client";

export const count = async (prisma: PrismaClient, model: string) => {
  return await prisma[model].count();
};
