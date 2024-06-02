import { PrismaClient } from "@prisma/client";
import { ThreadDTO } from "../types/ThreadDTO";
import { ThreadSchema } from "../validators/ThreadValidator";
import { v2 as cloudinary } from "cloudinary";

class ThreadService {
  private readonly prisma = new PrismaClient();

  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
  }

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
      await ThreadSchema.validateAsync(dto);

      let imageUrl = null;
      if (dto.image) {
        const uploadResult = await cloudinary.uploader.upload(dto.image, {
          upload_preset: "CircleApp"
        });
        imageUrl = uploadResult.secure_url;
      }

      const threadData = {
        ...dto,
        image: imageUrl,
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
      await ThreadSchema.validateAsync(dto);

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
