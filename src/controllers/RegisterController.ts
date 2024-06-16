import { Request, Response } from "express";
import RegisterService from "../services/RegisterService";
import { RegisterDTO } from "../types/RegisterDTO";
import { transporter } from "../libs/nodemailer";
import jwt from "jsonwebtoken";
import VerifyService from "../services/VerifyService";

class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  async register(req: Request, res: Response) {
    /* 
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
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

      const payload = { id: user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET);

      const fullUrl = req.protocol + "://" + req.get("host");

      const info = await transporter.sendMail({
        from: "Circle <suryaelidanto@gmail.com>", // sender address
        to: user.email, // list of receivers
        subject: "Verification Link", // Subject line
        html: `<a href="${fullUrl}/api/v/auth/verify-email?token=${token}">Klik untuk verifikasi email kamu!</a>`, // html body
      });

      console.log("Message sent: %s", info.messageId);

      await new VerifyService().createVerification(token, "EMAIL");

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
