import { PrismaClient } from "@prisma/client";
import { RegisterDTO } from "../types/RegisterDTO";
import { RegisterSchema } from "../validators/RegisterValidator";
import bcrypt from "bcrypt";

class RegisterService {
  private readonly prisma = new PrismaClient();

  async register(dto: RegisterDTO) {
    try {
      // Validate input DTO
      const { error } = RegisterSchema.validate(dto);
      if (error) {
        throw new Error(error.details[0].message);
      }

      // Hash password
      const salt = 10;
      const hashedPassword = await bcrypt.hash(dto.password, salt);

      // Create user
      const user = await this.prisma.user.create({
        data: { ...dto, password: hashedPassword },
      });

      return user;
    } catch (error) {
      throw new Error("Error registering user");
    }
  }
}

export default RegisterService;
