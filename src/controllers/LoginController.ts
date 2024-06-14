import { Request, Response } from "express";
import LoginService from "../services/LoginService";
import { LoginDTO } from "../types/LoginDTO";

class LoginController {
  constructor(private readonly loginService: LoginService) {}

  async login(req: Request, res: Response) {
    /* 
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: '#/components/schemas/LoginDTO'
            }
          }
        }
      } 
    */
    const dto = req.body as LoginDTO;

    try {
      const user = await this.loginService.login(dto);
      res.status(200).json(user);
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

export default LoginController;
