import { PrismaClient } from "@prisma/client";
import { PrismextOptions } from "../types";
import { parsePrismaSchema } from "./schema";

export const loadGlobal = async (options: PrismextOptions) => {
  const { models, provider } = await parsePrismaSchema(options.prisma?.schemaPath ?? "prisma/schema.prisma");

  global.prismext = {
    ...options,
    prisma: {
      ...options.prisma,
      instance: options.prisma?.instance ?? new PrismaClient(),
      schemaPath: options.prisma?.schemaPath ?? "prisma/schema.prisma",
      provider,
      models,
    },
  } as PrismextOptions;
};
