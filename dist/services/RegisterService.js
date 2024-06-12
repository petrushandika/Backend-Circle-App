"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const RegisterValidator_1 = require("../validators/RegisterValidator");
const bcrypt_1 = __importDefault(require("bcrypt"));
class RegisterService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async register(dto) {
        const { error } = RegisterValidator_1.RegisterSchema.validate(dto);
        if (error) {
            throw new Error(`Validation error: ${error.details[0].message}`);
        }
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existingUser) {
            throw new Error("User with this email already exists");
        }
        const hashedPassword = await bcrypt_1.default.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: Object.assign(Object.assign({}, dto), { password: hashedPassword }),
        });
        return user;
    }
}
exports.default = RegisterService;
//# sourceMappingURL=RegisterService.js.map