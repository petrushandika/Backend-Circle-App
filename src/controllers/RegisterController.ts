import { Request, Response } from "express";
import RegisterService from "../services/RegisterService";
import { RegisterDTO } from "../types/RegisterDTO";

class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  async register(req: Request, res: Response) {
    /* 
      #swagger.requestBody = {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              $ref: '#/components/schemas/RegisterDTO'
            }
          }
        }
      } 
    */
    const dto = req.body as RegisterDTO;

    try {
      const user = await this.registerService.register(dto);
      res.status(201).json(user);
    } catch (error: any) {
      console.error("Error registering:", error.message);
      if (error.message.includes("already exists")) {
        res.status(409).send(error.message);
      } else if (error.message.includes("Validation error")) {
        res.status(400).send(error.message);
      } else {
        res.status(500).send("Internal Server Error");
      }
    }
  }
}

export default RegisterController;
