import { PrismaClient } from "@prisma/client";
import { PrismextGlobal } from "packages/api/types";

export const discover = async (prisma: PrismaClient) => {
  const provider_queries = {
    postgresql: prisma.$queryRaw`SELECT DISTINCT table_name FROM information_schema.columns WHERE table_catalog = current_database() AND table_schema = 'public'`,
    mysql: prisma.$queryRaw`SELECT DISTINCT (TABLE_NAME as table_name) FROM information_schema.columns WHERE TABLE_SCHEMA = DATABASE()`,
  };
  const models = (global as unknown as PrismextGlobal).prismext.prisma.models;
  const provider = (global as unknown as PrismextGlobal).prismext.prisma.provider;
  const database_tables = (await provider_queries[provider]) as {
    table_name: string;
  }[];

  return {
    database: database_tables.map((table) => table.table_name).sort(),
    models: models.sort((a, b) => a.name.localeCompare(b.name) || a.database.localeCompare(b.database)),
  };
};
