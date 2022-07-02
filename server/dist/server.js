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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jwtResolver_1 = require("./resolvers/jwtResolver");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("./entities/User");
const jwtToken_1 = require("./utils/jwtToken");
const cors_1 = __importDefault(require("cors"));
const PORT = 5000;
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["https://studio.apollographql.com", "http://localhost:3000"],
}));
app.get("/", (_, res) => {
    res.send("SERVER IS RUNNING");
});
const apollo = async () => {
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [hello_1.Hello, UserResolver_1.UserResolver, jwtResolver_1.jwtResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res }),
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
dataSource_1.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source Initilized");
})
    .catch((e) => {
    console.log("Error initilizing Data Source !!!", e);
});
app.post("/refresh_token", async (req, res) => {
    const { rid } = req.cookies;
    if (!rid) {
        return res.json({
            ok: false,
            authToken: "",
        });
    }
    let payload = null;
    try {
        payload = jsonwebtoken_1.default.verify(rid, process.env.JWT_KEY);
    }
    catch (err) {
        console.log(err);
        return res.json({
            ok: false,
            authToken: "",
        });
    }
    const user = await User_1.User.findOne({ where: { id: payload.userID } });
    if (!user) {
        return res.json({
            ok: false,
            authToken: "",
        });
    }
    console.log(user);
    return res.json({
        ok: true,
        authToken: (0, jwtToken_1.createAuthToken)({ userID: user.id }),
    });
});
app.listen(PORT, () => {
    console.log("SERVER IS RUNNING !!!");
});
