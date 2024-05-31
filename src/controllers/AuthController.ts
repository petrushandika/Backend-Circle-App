import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { LoginDTO, RegisterDTO } from "../types/UserDTO";

class AuthController {
  constructor(private readonly authService: AuthService) {}

  async login(req: Request, res: Response) {
    const dto = req.body as LoginDTO;

    try {
      const result = await this.authService.login(dto);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async register(req: Request, res: Response) {
    const dto = req.body as RegisterDTO;

    try {
      const result = await this.authService.register(dto);
      res.status(201).json(result);
    } catch (error) {
      console.error("Error registering:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

export default AuthController;
