import { PrismaClient } from "@prisma/client";
import { UserDTO } from "../types/UserDTO";
import { UserSchema } from "../validators/UserValidator";

class UserService {
  private readonly prisma = new PrismaClient();

  async find() {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      throw new Error("Error retrieving users");
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.user.findFirst({ where: { id } });
    } catch (error) {
      throw new Error("Error retrieving user");
    }
  }

  async create(dto: UserDTO) {
    try {
      const validate = UserSchema.validate(dto);

      if (validate.error) {
        return validate.error.details;
      }

      return await this.prisma.user.create({ data: dto });
    } catch (error) {
      throw new Error("Error creating user");
    }
  }

  async update(id: number, dto: UserDTO) {
    try {
      UserSchema.validate(dto);

      return await this.prisma.user.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      throw new Error("Error updating user");
    }
  }

  async delete(id: number) {
    try {
      await this.prisma.$transaction([
        this.prisma.user.delete({ where: { id } }),
        this.prisma.thread.deleteMany({ where: { userId: id } }),
      ]);

      return;
    } catch (error) {
      throw new Error("Error deleting user");
    }
  }
}

export default UserService;
