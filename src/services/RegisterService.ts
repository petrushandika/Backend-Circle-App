import { PrismaClient } from "@prisma/client";
import { RegisterDTO } from "../types/RegisterDTO";
import { RegisterSchema } from "../validators/RegisterValidator";
import bcrypt from "bcrypt";

class RegisterService {
  private readonly prisma = new PrismaClient();

  async register(dto: RegisterDTO) {
    const { error } = RegisterSchema.validate(dto);
    if (error) {
      throw new Error(`Validation error: ${error.details[0].message}`);
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: { ...dto, password: hashedPassword },
    });

    return user;
  }
}

export default RegisterService;
