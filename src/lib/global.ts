import { PrismaClient } from "@prisma/client";
import { PrismextOptions } from "../types";

export const loadGlobal = async (options: PrismextOptions) => {
  global.prismext = {
    prisma: {
      instance: options.prisma?.instance ?? new PrismaClient(),
    },
  };
};
