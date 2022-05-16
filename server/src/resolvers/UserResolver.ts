import { User } from "../entities/User";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import bcrypt from "bcrypt";
import { MyContex } from "../@types/MyContex";
import { createRefToken } from "../utils/jwtToken";

@ObjectType()
class FieldError {
  @Field()
  message: string;

  @Field()
  field: string;
}

@ObjectType()
class UserResponse {
  @Field(() => FieldError, { nullable: true })
  error?: FieldError;

  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  pasword: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
}

@InputType()
class LoginInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

const validateUserOptions = (options: UsernamePasswordInput) => {
  let error: FieldError | undefined;

  if (options.pasword.length < 8) {
    error = {
      field: "password",
      message: "password too short",
    };
  } else if (options.pasword === "password1") {
    error = {
      field: "password",
      message: "dudeeeeeeee.... change them password",
    };
  } else if (options.username === "" || options.pasword === "") {
    error = {
      field: "username",
      message: "empty fields",
    };
  } else {
    error = undefined;
  }

  return error;
};

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async signup(
    @Arg("options") options: UsernamePasswordInput
  ): Promise<UserResponse> {
    let response: UserResponse;

    const error = validateUserOptions(options);

    if (error) {
      response = {
        error: {
          field: error.field,
          message: error.message,
        },
      };

      return response;
    }

    const hasedPassword = await bcrypt.hash(options.pasword, 12);

    // await User.delete({});

    try {
      const user = await User.create({
        username: options.username,
        password: hasedPassword,
        firstName: options.firstName,
        lastName: options.lastName,
      }).save();

      response = {
        user,
      };
      return response;
    } catch (e) {
      if (e.code === "23505") {
        response = {
          error: {
            field: "username",
            message: "username taken!!",
          },
        };
      } else {
        response = {
          error: {
            field: "username",
            message: "error signing up",
          },
        };
      }

      return response;
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("loginOptions") loginOptions: LoginInput,
    @Ctx() { res }: MyContex
  ): Promise<UserResponse> {
    console.log(loginOptions);

    let error: FieldError;
    let response: UserResponse;

    const user = await User.findOne({
      where: { username: loginOptions.username },
    });

    if (!user) {
      error = {
        field: "username",
        message: "user not found",
      };
    } else {
      if (!(await bcrypt.compare(loginOptions.password, user.password))) {
        error = {
          field: "password",
          message: "password did not match!",
        };
      } else {
        response = {
          user,
        };

        res.cookie("rid", createRefToken(user.id), {
          sameSite: "none",
          secure: true,
          httpOnly: true,
          maxAge: 15 * 100 * 60 * 60,
        });

        return response;
      }
    }

    response = {
      error: {
        field: error.field,
        message: error.message,
      },
    };

    return response;
  }
}
