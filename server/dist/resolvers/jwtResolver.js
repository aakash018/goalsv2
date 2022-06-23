"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtResolver = void 0;
const User_1 = require("../entities/User");
const isAuth_1 = require("../middlewares/isAuth");
const type_graphql_1 = require("type-graphql");
const jwtToken_1 = require("../utils/jwtToken");
let ResToken = class ResToken {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ResToken.prototype, "token", void 0);
ResToken = __decorate([
    (0, type_graphql_1.ObjectType)()
], ResToken);
let jwtResolver = class jwtResolver {
    async authToken() {
        const user = await User_1.User.findOne({
            where: { id: globalThis.LoggedInUserID },
        });
        if (!user) {
            throw "Not Authincated";
        }
        const token = (0, jwtToken_1.createAuthToken)({ userID: user.id });
        console.log("TOKEN", token);
        return {
            token,
        };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => ResToken),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], jwtResolver.prototype, "authToken", null);
jwtResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], jwtResolver);
exports.jwtResolver = jwtResolver;
