import { PrismaClient } from "@prisma/client";
import { ReplyDTO } from "../types/ReplyDTO";
import { ReplySchema } from "../validators/ReplyValidator";

class ReplyService {
  private readonly prisma = new PrismaClient();

  async find() {
    try {
      return await this.prisma.reply.findMany();
    } catch (error) {
      throw new Error("Error retrieving replies");
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.reply.findFirst({ where: { id } });
    } catch (error) {
      throw new Error("Error retrieving reply");
    }
  }

  async create(dto: ReplyDTO) {
    try {
      const validate = await ReplySchema.validateAsync(dto);
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
    } catch (error) {
      throw new Error("Error creating reply");
    }
  }

  async update(id: number, dto: ReplyDTO) {
    try {
      await ReplySchema.validateAsync(dto);
      return await this.prisma.reply.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      throw new Error("Error updating reply");
    }
  }

  async delete(id: number) {
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
    } catch (error) {
      throw new Error("Error deleting reply");
    }
  }
}

export default ReplyService;
