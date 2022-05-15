import { Request, Response } from "express";

export type MyContex = {
  req: Request;
  res: Response;
};
