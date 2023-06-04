import { PrismaClient } from "@prisma/client";

export type PrismextAction = "discover" | "describe" | "query";
export type Model = string;
export type Action = "count" | "findMany" | "findUnique" | "create";
export type Id = string;
export type Params = string[];

export type Query = {
  prismext: ["prismext", PrismextAction, Model, Action, Id, ...Params];
};

export type PrismextOptions = {
  forceInProduction?: boolean;
  debug?: boolean;

  prisma?: {
    schemaPath?: string;
    clientOptions?: unknown;
    instance?: PrismaClient;
  };
};

export type PrismextGlobal = {
  prismext: {
    forceInProduction: boolean;
    debug: boolean;
    prisma: {
      schemaPath: string;
      clientOptions: unknown;
      instance: PrismaClient;
      provider: string;
      models: { name: string; database: string }[];
    };
  };
};
