import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import { PrismextOptions, Query } from "./types";

import { discover } from "./actions/discover";
import { describe } from "./actions/describe";
import { count, create, findMany, findUnique } from "./actions/query";

import { send } from "./lib/send";
import { loadGlobal } from "./lib/global";
import { log } from "./lib/log";

const Prismext = (options: PrismextOptions) => async (req: NextApiRequest, res: NextApiResponse) => {
  await loadGlobal(options);
  const prisma = global.prismext.prisma.instance as PrismaClient;

  const { query, method } = req;
  const { prismext } = (query as Query) || { prismext: [] };
  const [, prismext_action, model, action, id] = prismext;

  try {
    if (method === "GET") {
      if (prismext_action === "discover") return send(res, 200, discover(prisma));
      if (prismext_action === "describe" && model) return send(res, 200, describe(prisma, model as unknown as string));

      if (prismext_action === "query") {
        if (model && action === "count") return send(res, 200, count(prisma, model));
        if (model && action === "findMany") return send(res, 200, findMany(prisma, model));
        if (model && action === "findUnique" && id) return send(res, 200, findUnique(prisma, model, { id }));
      }
    }

    if (method === "POST") {
      if (prismext_action === "query") {
        if (model && action === "create") return send(res, 201, create(prisma, model, req.body));
      }
    }

    throw {
      code: 400,
      message: "No action found for the given request method and query parameters.",
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
    log.error(error);
    return send(res, error.code ?? 500, {
      error: {
        ...error,
        code: error.code ?? 500,
        name: error.name ?? "INTERNAL_SERVER_ERROR",
        message: error.message ?? "Internal Server Error",
        cause: error.cause ?? {},
      },
    });
  } finally {
    if (options.prisma?.instance === undefined) await prisma.$disconnect();
  }
};

export default Prismext;
