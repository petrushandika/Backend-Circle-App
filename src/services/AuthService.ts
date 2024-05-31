import { PrismaClient } from "@prisma/client";
import { LoginDTO, RegisterDTO } from "../types/UserDTO";
import { LoginSchema, RegisterSchema } from "../validators/UserValidator";

class AuthService {
  private readonly prisma = new PrismaClient();

  async login(dto: LoginDTO) {
    try {
      // Validate input DTO
      const validationResult = LoginSchema.validate(dto);
      if (validationResult.error) {
        throw new Error(validationResult.error.details[0].message);
      }
    } catch (error) {
      throw new Error("Error logging in");
    }
  }

  async register(dto: RegisterDTO) {
    try {
      // Validate input DTO
      const validationResult = RegisterSchema.validate(dto);
      if (validationResult.error) {
        throw new Error(validationResult.error.details[0].message);
      }
    } catch (error) {
      throw new Error("Error registering");
    }
  }
}

export default AuthService;
