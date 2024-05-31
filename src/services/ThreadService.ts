import { PrismaClient } from "@prisma/client";
import { ThreadDTO } from "../types/ThreadDTO";
import { ThreadSchema } from "../validators/ThreadValidator";

class ThreadService {
  private readonly prisma = new PrismaClient();

  async find() {
    try {
      return await this.prisma.thread.findMany();
    } catch (error) {
      throw new Error("Error retrieving threads");
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.thread.findFirst({ where: { id } });
    } catch (error) {
      throw new Error("Error retrieving thread");
    }
  }

  async create(dto: ThreadDTO) {
    try {
      // Validate input DTO
      const validate = ThreadSchema.validate(dto);

      if (validate.error) {
        return validate.error.details;
        // throw new Error(validate.error.details[0].message);
      }

      return await this.prisma.thread.create({ data: dto });
    } catch (error) {
      throw new Error("Error creating thread");
    }
  }

  async update(id: number, dto: ThreadDTO) {
    try {
      // Validate input DTO
      ThreadSchema.validate(dto);

      return await this.prisma.thread.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      throw new Error("Error updating thread");
    }
  }

  async delete(id: number) {
    try {
      return await this.prisma.thread.delete({ where: { id } });
    } catch (error) {
      throw new Error("Error deleting thread");
    }
  }
}

export default ThreadService;
