import { PrismaClient } from "@prisma/client";
import { LoginDTO } from "../types/LoginDTO";
import { LoginSchema } from "../validators/LoginValidator";

class LoginService {
  private readonly prisma = new PrismaClient();

  async login(dto: LoginDTO) {
    try {
      // Validate input DTO
      const validate = LoginSchema.validate(dto);
      if (validate.error) {
        throw new Error(validate.error.details[0].message);
      }
    } catch (error) {
      throw new Error("Error logging in");
    }
  }
}

export default LoginService;
