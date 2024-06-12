import express from "express";
import { Router } from "express";
import RegisterController from "../controllers/RegisterController";
import RegisterService from "../services/RegisterService";

const router: Router = express.Router();
const registerService = new RegisterService();
const registerController = new RegisterController(registerService);

router.post("/auth/register", (req, res) =>
  registerController.register(req, res)
);

export default router;
