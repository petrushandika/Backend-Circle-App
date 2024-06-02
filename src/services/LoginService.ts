import { PrismaClient } from "@prisma/client";
import { LoginDTO } from "../types/LoginDTO";
import { LoginSchema } from "../validators/LoginValidator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class LoginService {
  private readonly prisma = new PrismaClient();

  async login(dto: LoginDTO) {
    try {
      // Validate input DTO
      const validate = LoginSchema.validate(dto);
      if (validate.error) {
        throw new Error(validate.error.details[0].message);
      }

      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (!user) {
        throw new Error("User not found!");
      }

      const isValidPassword = await bcrypt.compare(dto.password, user.password);

      if (!isValidPassword) {
        throw new Error("Invalid password");
      }

      const { password, ...userWithoutPassword } = user;

      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error("JWT secret is not defined");
      }
      const token = jwt.sign(userWithoutPassword, jwtSecret);

      return { token, user: userWithoutPassword };
    } catch (error) {
      throw new Error("Error logging in");
    }
  }
}

export default LoginService;
