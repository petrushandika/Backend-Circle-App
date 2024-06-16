import express, { Router } from "express";
import VerifyController from "../controllers/VerifyController";

const router: Router = express.Router();
const verifyController = new VerifyController();

router.get("/auth/verify-email", (req, res) => verifyController.verify(req, res));

export default router;
