"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthToken = exports.createRefToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createRefToken = (data) => {
    try {
        return jsonwebtoken_1.default.sign({ userID: data }, process.env.JWT_KEY, {
            expiresIn: "15m",
        });
    }
    catch (e) {
        console.log(e);
        return "dfsdf";
    }
};
exports.createRefToken = createRefToken;
const createAuthToken = (data) => {
    return jsonwebtoken_1.default.sign(data, process.env.JWT_KEY, {
        expiresIn: 60 * 60 * 15,
    });
};
exports.createAuthToken = createAuthToken;
