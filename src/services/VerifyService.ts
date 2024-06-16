import { PrismaClient, verificationType } from "@prisma/client";
import jwt from "jsonwebtoken";

class VerifyService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createVerification(token: string, type: verificationType) {
    try {
      return await this.prisma.verification.create({
        data: {
          token,
          type,
        },
      });
    } catch (error) {
      console.error("Failed to create verification:", error);
      throw new Error(error.message || "Failed to create verification");
    }
  }

  async verify(token: string) {
    try {
      const verification = await this.prisma.verification.findUnique({
        where: { token },
      });

      if (!verification) {
        throw new Error("Invalid or expired token");
      }

      const payload = jwt.verify(verification.token, process.env.JWT_SECRET) as { id: number };

      console.log("Token payload:", payload);

      if (!payload || typeof payload !== 'object' || !payload.id) {
        throw new Error("Invalid token payload");
      }

      if (verification.type === verificationType.FORGOT_PASSWORD) {
        // TODO: handle forgot password logic
        return;
      }

      return await this.prisma.user.update({
        data: { verified: true },
        where: { id: payload.id },
      });
    } catch (error) {
      console.error("Failed to verify email:", error);
      throw new Error(error.message || "Failed to verify email");
    }
  }
}

export default VerifyService;
