import express from "express";
import { Router } from "express";
import { authenticate } from "../middlewares/Authenticate";
import CheckController from "../controllers/CheckController";

const router: Router = express.Router();
const checkController = new CheckController();

router.get("/auth/check", authenticate, (req, res) =>
  checkController.check(req, res)
);

export default router;
