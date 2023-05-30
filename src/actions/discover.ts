import { PrismaClient } from "@prisma/client";

export const discover = async (prisma: PrismaClient) => {
  const database_tables = (await prisma.$queryRaw`SELECT
        DISTINCT(TABLE_NAME)
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE()`) as {
    TABLE_NAME: string;
  }[];
  const models = Object.keys(prisma).filter((key) => !key.startsWith("$") && !key.startsWith("_"));

  return {
    database: database_tables.map((table) => table.TABLE_NAME).sort(),
    models: models.sort(),
  };
};
