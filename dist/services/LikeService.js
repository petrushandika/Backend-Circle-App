"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const LikeValidator_1 = require("../validators/LikeValidator");
class LikeService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async find() {
        return this.prisma.like.findMany();
    }
    async findOne(id) {
        return this.prisma.like.findFirst({ where: { id } });
    }
    async create(dto) {
        const validate = await LikeValidator_1.LikeSchema.validateAsync(dto);
        // Start a transaction
        const [like, thread] = await this.prisma.$transaction([
            this.prisma.like.create({ data: validate }),
            this.prisma.thread.update({
                where: { id: validate.threadId },
                data: {
                    totalLikes: { increment: 1 }
                }
            })
        ]);
        return like;
    }
    async delete(id) {
        const like = await this.prisma.like.findUnique({ where: { id } });
        if (!like) {
            throw new Error("Like not found");
        }
        // Start a transaction
        await this.prisma.$transaction([
            this.prisma.like.delete({ where: { id } }),
            this.prisma.thread.update({
                where: { id: like.threadId },
                data: {
                    totalLikes: { decrement: 1 }
                }
            })
        ]);
        return like;
    }
}
exports.default = LikeService;
//# sourceMappingURL=LikeService.js.map