import { Request, Response } from "express";
import VerifyService from "../services/VerifyService";

class VerifyController {
  private verifyService: VerifyService;

  constructor() {
    this.verifyService = new VerifyService();
  }

  verify = async (req: Request, res: Response) => {
    try {
      const token = req.query.token as string;
      if (!token) {
        return res.status(400).json({ message: "Token is required" });
      }

      await this.verifyService.verify(token);

      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

      res.redirect(`${frontendUrl}/auth/login`);
    } catch (error) {
      console.error("Error verifying user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}

export default VerifyController;
