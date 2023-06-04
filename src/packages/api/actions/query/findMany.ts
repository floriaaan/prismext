import { PrismaClient } from "@prisma/client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const findMany = async (prisma: PrismaClient, model: string, _params?: never) => {
  return await prisma[model].findMany();
};
