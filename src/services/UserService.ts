import { PrismaClient } from "@prisma/client";
import { UserDTO } from "../types/UserDTO";
import { UserSchema } from "../validators/UserValidator";
import { v2 as cloudinary } from "cloudinary";

class UserService {
  private readonly prisma = new PrismaClient();

  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async find(search: string) {
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
    } catch (error) {
      console.error("Error retrieving users:", error);
      throw new Error("Error retrieving users");
    }
  }

  async findOne(userId: number) {
    try {
      return await this.prisma.user.findFirst({
        where: { id: userId },
        include: {
          followers: true,
          following: true,
        },
      });
    } catch (error) {
      console.error("Error retrieving user:", error);
      throw new Error("Error retrieving user");
    }
  }

  async create(dto: UserDTO) {
    try {
      const { error, value } = UserSchema.validate(dto);

      if (error) {
        throw new Error(
          `Validation error: ${error.details.map((x) => x.message).join(", ")}`
        );
      }

      return await this.prisma.user.create({ data: value });
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Error creating user");
    }
  }

  async update(id: number, dto: UserDTO) {
    try {
      console.log(dto.avatar);
      await UserSchema.validateAsync(dto);

      let imageUrl = dto.avatar || null;
      if (dto.avatar) {
        const uploadResult = await cloudinary.uploader.upload(dto.avatar, {
          upload_preset: "CircleApp",
        });
        imageUrl = uploadResult.secure_url;
      }

      const userData = {
        ...dto,
        avatar: imageUrl,
      };

      console.log("Updating user with data:", userData);

      return await this.prisma.user.update({
        where: { id: +id },
        data: userData,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Error updating user");
    }
  }

  async delete(id: number) {
    try {
      await this.prisma.$transaction([
        this.prisma.user.delete({ where: { id } }),
        this.prisma.thread.deleteMany({ where: { userId: id } }),
      ]);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Error deleting user");
    }
  }
}

export default UserService;
