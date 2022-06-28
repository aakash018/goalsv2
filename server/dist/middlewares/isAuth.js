"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuth = async ({ context }, next) => {
    if (context.req.cookies.rid) {
        const tokenString = context.req.headers.authorization;
        if (!tokenString) {
            throw "Not authenticated";
        }
        const jid = tokenString.split(" ")[1];
        try {
            const token = jsonwebtoken_1.default.verify(jid, process.env.JWT_KEY);
            if (!token) {
                throw "Not authenticated";
            }
            return next();
        }
        catch (err) {
            console.error(err);
            throw "Error in authorization! try reloggin in";
        }
    }
    else {
        throw "no cookie found";
    }
};
exports.isAuth = isAuth;
