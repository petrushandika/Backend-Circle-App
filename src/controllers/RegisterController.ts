import { Request, Response } from "express";
import RegisterService from "../services/RegisterService";
import { RegisterDTO } from "../types/RegisterDTO";

class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  async register(req: Request, res: Response) {
    const dto = req.body as RegisterDTO;

    try {
      const user = await this.registerService.register(dto);
      res.status(201).json(user);
    } catch (error) {
      console.error("Error registering:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

export default RegisterController;
