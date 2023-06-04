import { PrismaClient } from "@prisma/client";
import { PrismextGlobal } from "types";

type TableDescription = {
  table_name: string;
  column_name: string;
  data_type: string;
  is_nullable: string;
  column_default: string;
  column_type: string;
  column_key: string;
  extra: string;
  column_comment: string;
};

export const describe = async (prisma: PrismaClient, model: string) => {
  const models = (global as unknown as PrismextGlobal).prismext.prisma.models;
  const model_tableName = models.find((m) => m.name === model)?.database;

  const provider_queries = {
    postgresql: prisma.$queryRaw`SELECT 
          table_name, column_name, data_type, is_nullable, column_default
          FROM information_schema.columns
          WHERE table_name = ${model_tableName} AND table_schema = 'public'`,
    mysql: prisma.$queryRaw`SELECT 
          TABLE_NAME as table_name, COLUMN_NAME as column_name, DATA_TYPE as data_type, IS_NULLABLE as is_nullable, COLUMN_DEFAULT as column_default, COLUMN_TYPE as column_type, COLUMN_KEY as column_key, EXTRA as extra, COLUMN_COMMENT as column_comment
          FROM INFORMATION_SCHEMA.COLUMNS
          WHERE TABLE_NAME = ${model_tableName}`,
  };
  const provider = (global as unknown as PrismextGlobal).prismext.prisma.provider;

  const raw = (await provider_queries[provider]) as TableDescription[];

  const description = raw?.reduce((acc, curr) => {
    acc[curr.column_name] = curr;
    return acc;
  }, {} as { [key: string]: TableDescription });

  return description;
};
