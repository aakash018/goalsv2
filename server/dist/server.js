"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dataSource_1 = require("./dataSource");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const UserResolver_1 = require("./resolvers/UserResolver");
const PORT = 5000;
const app = (0, express_1.default)();
app.get("/", (_, res) => {
    res.send("SERVER IS RUNNING");
});
const apollo = async () => {
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [hello_1.Hello, UserResolver_1.UserResolver],
            validate: false,
        }),
        context: () => { },
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: { credentials: true, origin: "*" },
    });
};
apollo();
dataSource_1.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source Initilized");
})
    .catch((e) => {
    console.log("Error initilizing Data Source !!!", e);
});
app.listen(PORT, () => {
    console.log("SERVER IS RUNNING !!!");
});
