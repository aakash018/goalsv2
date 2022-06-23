import "reflect-metadata";

import express from "express";
import { AppDataSource } from "./dataSource";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { Hello } from "./resolvers/hello";
import { UserResolver } from "./resolvers/UserResolver";
import { MyContex } from "./@types/MyContex";

import cookieParser from "cookie-parser";
import { jwtResolver } from "./resolvers/jwtResolver";

import jwt from "jsonwebtoken";
import { User } from "./entities/User";
import { createAuthToken } from "./utils/jwtToken";

const PORT = 5000;

const app = express();
app.use(cookieParser());

app.get("/", (_, res) => {
  res.send("SERVER IS RUNNING");
});

//? Apollo Server INIT

const apollo = async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [Hello, UserResolver, jwtResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContex => ({ req, res }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
    },
  });
};

apollo();

//? Database INIT

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source Initilized");
  })
  .catch((e) => {
    console.log("Error initilizing Data Source !!!", e);
  });

//? REFRESH TOKEN API
app.post("/refresh_token", async (req, res) => {
  const { rid }: { rid: string } = req.cookies;

  if (!rid) {
    return res.json({
      ok: false,
      authToken: "",
    });
  }

  let payload: any = null;

  try {
    payload = jwt.verify(rid, process.env.JWT_KEY);
  } catch (err) {
    console.log(err);

    return res.json({
      ok: false,
      authToken: "",
    });
  }

  const user = await User.findOne(payload.id);

  if (!user) {
    return res.json({
      ok: false,
      authToken: "",
    });
  }
  return res.json({
    ok: true,
    authToken: createAuthToken(user.id),
  });
});

//? SERVER LISTEN
app.listen(PORT, () => {
  console.log("SERVER IS RUNNING !!!");
});
