"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const LoginValidator_1 = require("../validators/LoginValidator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async login(dto) {
        try {
            // Validate input DTO
            const validate = LoginValidator_1.LoginSchema.validate(dto);
            if (validate.error) {
                throw new Error(validate.error.details[0].message);
            }
            const user = await this.prisma.user.findUnique({
                where: {
                    email: dto.email,
                },
            });
            if (!user) {
                throw new Error("User not found!");
            }
            const isValidPassword = await bcrypt_1.default.compare(dto.password, user.password);
            if (!isValidPassword) {
                throw new Error("Invalid password");
            }
            const { password } = user, userWithoutPassword = __rest(user, ["password"]);
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                throw new Error("JWT secret is not defined");
            }
            const token = jsonwebtoken_1.default.sign(userWithoutPassword, jwtSecret);
            return { token, user: userWithoutPassword };
        }
        catch (error) {
            throw new Error("Error logging in");
        }
    }
}
exports.default = LoginService;
//# sourceMappingURL=LoginService.js.map