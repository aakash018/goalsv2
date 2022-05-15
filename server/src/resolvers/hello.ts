import { isAuth } from "../middlewares/isAuth";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { MyContex } from "../@types/MyContex";

@Resolver()
export class Hello {
  @Query(() => String)
  @UseMiddleware(isAuth)
  hello(@Ctx() {}: MyContex) {
    return "Hello World!!";
  }
}
