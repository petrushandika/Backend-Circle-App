// services/ThreadService.ts
import { PrismaClient } from "@prisma/client";

class ThreadService {
  private readonly prisma = new PrismaClient();

  async find() {
    try {
      const threads = await this.prisma.thread.findMany();
      return threads;
    } catch (error) {
      throw new Error("Error retrieving threads");
    }
  }

  async findOne(id: number) {
    try {
      const thread = await this.prisma.thread.findFirst({ where: { id } });
      return thread;
    } catch (error) {
      throw new Error("Error retrieving thread");
    }
  }
}

export default ThreadService;
