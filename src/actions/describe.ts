import { PrismaClient } from "@prisma/client";

type TableDescription = {
  TABLE_NAME: string;
  COLUMN_NAME: string;
  DATA_TYPE: string;
  IS_NULLABLE: string;
  COLUMN_DEFAULT: string;
  COLUMN_TYPE: string;
  COLUMN_KEY: string;
  EXTRA: string;
  COLUMN_COMMENT: string;
};

export const describe = async (prisma: PrismaClient, model: string) => {
  const raw = (await prisma.$queryRaw`SELECT 
          TABLE_NAME, COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT, COLUMN_TYPE, COLUMN_KEY, EXTRA, COLUMN_COMMENT
          FROM INFORMATION_SCHEMA.COLUMNS
          WHERE TABLE_NAME = ${model}`) as TableDescription[];

  const description = raw?.reduce((acc, curr) => {
    acc[curr.COLUMN_NAME] = curr;
    return acc;
  }, {} as { [key: string]: TableDescription });

  return description;
};
