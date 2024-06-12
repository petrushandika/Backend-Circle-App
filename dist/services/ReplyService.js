"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const ReplyValidator_1 = require("../validators/ReplyValidator");
class ReplyService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async find() {
        try {
            return await this.prisma.reply.findMany();
        }
        catch (error) {
            throw new Error("Error retrieving replies");
        }
    }
    async findOne(id) {
        try {
            return await this.prisma.reply.findFirst({ where: { id } });
        }
        catch (error) {
            throw new Error("Error retrieving reply");
        }
    }
    async create(dto) {
        try {
            const validate = await ReplyValidator_1.ReplySchema.validateAsync(dto);
            const reply = await this.prisma.reply.create({ data: validate });
            // Start a transaction to update totalReplies in the associated thread
            await this.prisma.$transaction([
                this.prisma.reply.create({ data: validate }),
                this.prisma.thread.update({
                    where: { id: dto.threadId },
                    data: {
                        totalReplies: { increment: 1 },
                    },
                }),
            ]);
            return reply;
        }
        catch (error) {
            throw new Error("Error creating reply");
        }
    }
    async update(id, dto) {
        try {
            await ReplyValidator_1.ReplySchema.validateAsync(dto);
            return await this.prisma.reply.update({
                where: { id },
                data: dto,
            });
        }
        catch (error) {
            throw new Error("Error updating reply");
        }
    }
    async delete(id) {
        try {
            const reply = await this.prisma.reply.findUnique({ where: { id } });
            if (!reply) {
                throw new Error("Reply not found");
            }
            // Start a transaction to update totalReplies in the associated thread
            await this.prisma.$transaction([
                this.prisma.reply.delete({ where: { id } }),
                this.prisma.thread.update({
                    where: { id: reply.threadId },
                    data: {
                        totalReplies: { decrement: 1 },
                    },
                }),
            ]);
            return reply;
        }
        catch (error) {
            throw new Error("Error deleting reply");
        }
    }
}
exports.default = ReplyService;
//# sourceMappingURL=ReplyService.js.map