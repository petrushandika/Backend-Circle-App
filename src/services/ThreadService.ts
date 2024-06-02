import { PrismaClient } from "@prisma/client";
import { ThreadDTO } from "../types/ThreadDTO";
import { ThreadSchema } from "../validators/ThreadValidator";

class ThreadService {
  private readonly prisma = new PrismaClient();

  async find() {
    try {
      return await this.prisma.thread.findMany();
    } catch (error) {
      this.handleError("Error retrieving threads", error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.thread.findFirst({ where: { id } });
    } catch (error) {
      this.handleError("Error retrieving thread", error);
    }
  }

  async create(dto: ThreadDTO) {
    try {
      // Validate input DTO
      await ThreadSchema.validateAsync(dto);

      // Ensure the correct data types for Prisma
      const threadData = {
        ...dto,
        totalLikes: dto.totalLikes ? Number(dto.totalLikes) : 0,
        totalReplies: dto.totalReplies ? Number(dto.totalReplies) : 0,
        userId: Number(dto.userId),
      };

      console.log("Creating thread with data:", threadData);
      return await this.prisma.thread.create({ data: threadData });
    } catch (error) {
      this.handleError("Error creating thread", error);
    }
  }

  async update(id: number, dto: ThreadDTO) {
    try {
      // Validate input DTO
      await ThreadSchema.validateAsync(dto);

      // Ensure the correct data types for Prisma
      const threadData = {
        ...dto,
        totalLikes: dto.totalLikes ? Number(dto.totalLikes) : 0,
        totalReplies: dto.totalReplies ? Number(dto.totalReplies) : 0,
        userId: Number(dto.userId),
      };

      console.log("Updating thread with id:", id, "and data:", threadData);
      return await this.prisma.thread.update({
        where: { id },
        data: threadData,
      });
    } catch (error) {
      this.handleError("Error updating thread", error);
    }
  }

  async delete(id: number) {
    try {
      await this.prisma.$transaction([
        this.prisma.thread.delete({ where: { id } }),
        this.prisma.like.deleteMany({ where: { threadId: id } }),
        this.prisma.reply.deleteMany({ where: { threadId: id } }),
      ]);
      console.log("Thread deleted with id:", id);
    } catch (error) {
      this.handleError("Error deleting thread", error);
    }
  }

  private handleError(message: string, error: unknown): never {
    console.error(message, error);
    if (error instanceof Error) {
      throw new Error(`${message}: ${error.message}`);
    } else {
      throw new Error(message);
    }
  }
}

export default ThreadService;
