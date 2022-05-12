import "reflect-metadata";

import express from "express";
import { AppDataSource } from "./dataSource";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { Hello } from "./resolvers/hello";
import { UserResolver } from "./resolvers/UserResolver";

const PORT = 5000;

const app = express();

app.get("/", (_, res) => {
  res.send("SERVER IS RUNNING");
});

//? Apollo Server INIT

const apollo = async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [Hello, UserResolver],
      validate: false,
    }),
    context: () => {},
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: { credentials: true, origin: "*" },
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

//? SERVER LISTEN
app.listen(PORT, () => {
  console.log("SERVER IS RUNNING !!!");
});
