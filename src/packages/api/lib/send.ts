import { NextApiResponse } from "next";

export const send = async (res: NextApiResponse, status: number, data: unknown) => {
  // if data is a promise, await it
  if (data instanceof Promise) data = await data;
  return res.status(status).json(data);
};
