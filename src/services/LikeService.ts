import { PrismaClient } from "@prisma/client";
import { LikeDTO } from "../types/LikeDTO";
import { LikeSchema } from "../validators/LikeValidator";

class LikeService {
  private readonly prisma = new PrismaClient();

  async find() {
    return this.prisma.like.findMany();
  }

  async findOne(id: number) {
    return this.prisma.like.findFirst({ where: { id } });
  }

  async create(dto: LikeDTO) {
    const validate = await LikeSchema.validateAsync(dto);

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

  async delete(id: number) {
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

export default LikeService;
