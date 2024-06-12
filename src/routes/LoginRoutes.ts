import express from "express";
import { Router } from "express";
import LoginController from "../controllers/LoginController";
import LoginService from "../services/LoginService";

const router: Router = express.Router();
const loginService = new LoginService();
const loginController = new LoginController(loginService);

router.post("/auth/login", (req, res) => loginController.login(req, res));

export default router;
