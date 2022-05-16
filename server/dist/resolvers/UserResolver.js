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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const User_1 = require("../entities/User");
const type_graphql_1 = require("type-graphql");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtToken_1 = require("../utils/jwtToken");
let FieldError = class FieldError {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
FieldError = __decorate([
    (0, type_graphql_1.ObjectType)()
], FieldError);
let UserResponse = class UserResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => FieldError, { nullable: true }),
    __metadata("design:type", FieldError)
], UserResponse.prototype, "error", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
let UsernamePasswordInput = class UsernamePasswordInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UsernamePasswordInput.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UsernamePasswordInput.prototype, "pasword", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UsernamePasswordInput.prototype, "firstName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UsernamePasswordInput.prototype, "lastName", void 0);
UsernamePasswordInput = __decorate([
    (0, type_graphql_1.InputType)()
], UsernamePasswordInput);
let LoginInput = class LoginInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginInput.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
LoginInput = __decorate([
    (0, type_graphql_1.InputType)()
], LoginInput);
const validateUserOptions = (options) => {
    let error;
    if (options.pasword.length < 8) {
        error = {
            field: "password",
            message: "password too short",
        };
    }
    else if (options.pasword === "password1") {
        error = {
            field: "password",
            message: "dudeeeeeeee.... change them password",
        };
    }
    else if (options.username === "" || options.pasword === "") {
        error = {
            field: "username",
            message: "empty fields",
        };
    }
    else {
        error = undefined;
    }
    return error;
};
let UserResolver = class UserResolver {
    async signup(options) {
        let response;
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
        const hasedPassword = await bcrypt_1.default.hash(options.pasword, 12);
        try {
            const user = await User_1.User.create({
                username: options.username,
                password: hasedPassword,
                firstName: options.firstName,
                lastName: options.lastName,
            }).save();
            response = {
                user,
            };
            return response;
        }
        catch (e) {
            if (e.code === "23505") {
                response = {
                    error: {
                        field: "username",
                        message: "username taken!!",
                    },
                };
            }
            else {
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
    async login(loginOptions, { res }) {
        console.log(loginOptions);
        let error;
        let response;
        const user = await User_1.User.findOne({
            where: { username: loginOptions.username },
        });
        if (!user) {
            error = {
                field: "username",
                message: "user not found",
            };
        }
        else {
            if (!(await bcrypt_1.default.compare(loginOptions.password, user.password))) {
                error = {
                    field: "password",
                    message: "password did not match!",
                };
            }
            else {
                response = {
                    user,
                };
                res.cookie("rid", (0, jwtToken_1.createRefToken)(user.id), {
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
};
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UsernamePasswordInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "signup", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)("loginOptions")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
