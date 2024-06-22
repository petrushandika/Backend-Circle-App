import { PrismaClient } from "@prisma/client";
import { ReplyDTO } from "../types/ReplyDTO";
import { ReplySchema } from "../validators/ReplyValidator";
import { v2 as cloudinary } from "cloudinary";

class ReplyService {
  private readonly prisma = new PrismaClient();

  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async find() {
    try {
      return await this.prisma.reply.findMany({
        include: {
          user: {
            select: {
              avatar: true,
              fullName: true,
              username: true,
            },
          },
        },
      });
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
      await ReplySchema.validateAsync(dto);

      let imageUrl = null;
      if (dto.image) {
        const uploadResult = await cloudinary.uploader.upload(dto.image, {
          upload_preset: "CircleApp",
        });
        imageUrl = uploadResult.secure_url;
      }

      const replyData = {
        userId: dto.userId,
        threadId: dto.threadId,
        content: dto.content,
        image: imageUrl,
      };

      const reply = await this.prisma.reply.create({ data: replyData });

      await this.prisma.$transaction([
        this.prisma.reply.create({ data: replyData }),
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

      let imageUrl = dto.image;
      if (dto.image && dto.image.startsWith("data:")) {
        const uploadResult = await cloudinary.uploader.upload(dto.image, {
          upload_preset: "CircleApp",
        });
        imageUrl = uploadResult.secure_url;
      }

      const updateData = {
        userId: dto.userId,
        threadId: dto.threadId,
        content: dto.content,
        image: imageUrl,
      };

      return await this.prisma.reply.update({
        where: { id },
        data: updateData,
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
