import { User } from "../entities/User";
import { isAuth } from "../middlewares/isAuth";
// import jwt from "jsonwebtoken";
import {
  Field,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { createAuthToken } from "../utils/jwtToken";

@ObjectType()
class ResToken {
  @Field()
  token: string;
}

@Resolver()
export class jwtResolver {
  @Query(() => ResToken)
  @UseMiddleware(isAuth)
  async authToken(): Promise<ResToken> {
    const user = await User.findOne({
      where: { id: globalThis.LoggedInUserID },
    });

    if (!user) {
      throw "Not Authincated";
    }

    const token = createAuthToken({ userID: user.id });

    console.log("TOKEN", token);
    return {
      token,
    };
  }
}
