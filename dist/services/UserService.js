"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const UserValidator_1 = require("../validators/UserValidator");
class UserService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async find(search) {
        try {
            return await this.prisma.user.findMany({
                where: {
                    username: {
                        contains: search,
                    },
                },
                include: {
                    followers: true,
                    following: true,
                },
            });
        }
        catch (error) {
            console.error("Error retrieving users:", error);
            throw new Error("Error retrieving users");
        }
    }
    async findOne(userId) {
        try {
            return await this.prisma.user.findFirst({
                where: { id: userId },
                include: {
                    followers: true,
                    following: true,
                },
            });
        }
        catch (error) {
            console.error("Error retrieving user:", error);
            throw new Error("Error retrieving user");
        }
    }
    async create(dto) {
        try {
            const { error, value } = UserValidator_1.UserSchema.validate(dto);
            if (error) {
                throw new Error(`Validation error: ${error.details.map((x) => x.message).join(", ")}`);
            }
            return await this.prisma.user.create({ data: value });
        }
        catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Error creating user");
        }
    }
    async update(id, dto) {
        try {
            const { error, value } = UserValidator_1.UserSchema.validate(dto);
            if (error) {
                throw new Error(`Validation error: ${error.details.map((x) => x.message).join(", ")}`);
            }
            return await this.prisma.user.update({
                where: { id },
                data: value,
            });
        }
        catch (error) {
            console.error("Error updating user:", error);
            throw new Error("Error updating user");
        }
    }
    async delete(id) {
        try {
            await this.prisma.$transaction([
                this.prisma.user.delete({ where: { id } }),
                this.prisma.thread.deleteMany({ where: { userId: id } }),
            ]);
        }
        catch (error) {
            console.error("Error deleting user:", error);
            throw new Error("Error deleting user");
        }
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map