import { MiddlewareFn } from "type-graphql";
import { MyContex } from "src/@types/MyContex";
import jwt from "jsonwebtoken";

export const isAuth: MiddlewareFn<MyContex> = async ({ context }, next) => {
  if (context.req.cookies.rid) {
    const tokenString = context.req.headers.authorization as string;

    if (!tokenString) {
      throw "Not authenticated";
    }

    const jid = tokenString.split(" ")[1];

    try {
      const token = jwt.verify(jid, process.env.JWT_KEY);

      if (!token) {
        throw "Not authenticated";
      }

      return next();
    } catch (err) {
      console.error(err);
      throw "Error in authorization! try reloggin in";
    }
  } else {
    throw "no cookie found";
  }
};
