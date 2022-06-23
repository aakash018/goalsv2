import { MiddlewareFn } from "type-graphql";
import { MyContex } from "src/@types/MyContex";
import jwt from "jsonwebtoken";

export const isAuth: MiddlewareFn<MyContex> = async ({ context }, next) => {
  if (context.req.cookies.rid) {
    const { rid }: { rid: string } = context.req.cookies;

    const token = jwt.verify(rid, process.env.JWT_KEY) as {
      userID: number;
      iat: number;
      eat: number;
    };

    if (!token) {
      throw "Not authenticated";
    }

    globalThis.LoggedInUserID = token.userID;

    return next();
  } else {
    throw "no cookie found";
  }
};
