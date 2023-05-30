import { NextApiResponse } from "next";

export const send = (res: NextApiResponse, status: number, data: unknown) => {
  return res.status(status).json(data);
};
