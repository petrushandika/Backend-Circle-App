import { PrismaClient } from "@prisma/client";
import { RegisterDTO } from "../types/RegisterDTO";
import { RegisterSchema } from "../validators/RegisterValidator";

class RegisterService {
  private readonly prisma = new PrismaClient();

  async register(dto: RegisterDTO) {
    try {
      // Validate input DTO
      const validate = RegisterSchema.validate(dto);
      if (validate.error) {
        // return validate.error;
        throw new Error(validate.error.details[0].message);
      }
    } catch (error) {
      throw new Error("Error registering");
    }
  }
}

export default RegisterService;
