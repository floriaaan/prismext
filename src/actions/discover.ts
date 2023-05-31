import { PrismaClient } from "@prisma/client";

export const discover = async (prisma: PrismaClient) => {
  const provider_queries = {
    postgres: prisma.$queryRaw`SELECT DISTINCT table_name FROM information_schema.columns WHERE table_catalog = current_database() AND table_schema = 'public'`,
    mysql: prisma.$queryRaw`SELECT DISTINCT (TABLE_NAME as table_name) FROM information_schema.columns WHERE TABLE_SCHEMA = DATABASE()`,
  };

  const database_tables = (await provider_queries["postgres"]) as {
    table_name: string;
  }[];

  const models = Object.keys(prisma).filter((key) => !key.startsWith("$") && !key.startsWith("_"));

  return {
    database: database_tables.map((table) => table.table_name).sort(),
    models: models.sort(),
  };
};
