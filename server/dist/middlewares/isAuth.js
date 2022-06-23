"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuth = async ({ context }, next) => {
    if (context.req.cookies.rid) {
        const { rid } = context.req.cookies;
        const token = jsonwebtoken_1.default.verify(rid, process.env.JWT_KEY);
        if (!token) {
            throw "Not authenticated";
        }
        globalThis.LoggedInUserID = token.userID;
        return next();
    }
    else {
        throw "no cookie found";
    }
};
exports.isAuth = isAuth;
