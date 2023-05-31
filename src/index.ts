/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismextOptions, Query } from "./types";
import { discover } from "./actions/discover";
import { describe } from "./actions/describe";
import { send } from "./utils/send";

/*
  FIX #1:
  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'PrismaClient<PrismaClientOptions, never, RejectOnNotFound | RejectPerOperation | undefined>'.
  No index signature with a parameter of type 'string' was found on type 'PrismaClient<PrismaClientOptions, never, RejectOnNotFound | RejectPerOperation | undefined>'


 */

const Prismext = (options: PrismextOptions) => async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = options.prisma?.instance ?? new PrismaClient();
  const { query, method } = req;
  const {
    prismext: [, prismext_action, model, action, id],
  } = (query as Query) || { prismext: [] };

  try {
    if (method === "GET") {
      if (prismext_action === "discover") return send(res, 200, await discover(prisma));

      if (prismext_action === "describe" && model)
        return send(res, 200, await describe(prisma, model as unknown as string));

      if (prismext_action === "query" && model && action === "count")
        // @ts-ignore // TODO: fix #1
        return send(res, 200, await prisma[model].count());

      if (prismext_action === "query" && model && action === "findMany")
        // @ts-ignore // TODO: fix #1
        return send(res, 200, await prisma[model].findMany());

      if (prismext_action === "query" && model && action === "findUnique" && id)
        return send(
          res,
          200,
          // @ts-ignore // TODO: fix #1
          await prisma[model].findUnique({ where: { id: Number(id) } }),
        );
    }

    if (method === "POST") {
      if (prismext_action === "query" && model && action === "create") {
        const { body } = req;
        // @ts-ignore // TODO: fix #1
        return send(res, 201, await prisma[model].create({ data: body }));
      }
    }

    throw {
      code: 400,
      message: "Bad Request",
      name: "BAD_REQUEST",

      cause: {
        method: { expected: "GET", actual: method },
        action: {
          supported: ["count", "findMany", "findUnique", "create"],
          actual: action,
        },
      },
    };
  } catch (error) {
    console.error(error);
    return send(res, 500, {
      error: {
        ...error,
        code: error.code ?? 500,
        name: error.name ?? "INTERNAL_SERVER_ERROR",
        message: error instanceof Error ? error.message : "Internal Server Error",
        cause: error.cause ?? {},
      },
    });
  } finally {
    if (options.prisma?.instance === undefined) await prisma.$disconnect();
  }
};

export default Prismext;
