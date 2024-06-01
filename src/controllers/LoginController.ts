import { Request, Response } from "express";
import LoginService from "../services/LoginService";
import { LoginDTO } from "../types/LoginDTO";

class LoginController {
  constructor(private readonly loginService: LoginService) {}

  async login(req: Request, res: Response) {
    const dto = req.body as LoginDTO;

    try {
      const result = await this.loginService.login(dto);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

export default LoginController;
