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
    clientPath?: string;
    clientOptions?: unknown;
    instance?: PrismaClient;
  };
};
