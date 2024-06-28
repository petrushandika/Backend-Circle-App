import express from "express";
import { Router } from "express";
import UserController from "../controllers/UserController";
import UserService from "../services/UserService";
import { authenticate } from "../middlewares/Authenticate";
import upload from "../middlewares/UploadFile";

const router: Router = express.Router();
const userService = new UserService();
const userController = new UserController(userService);

router.get("/users", authenticate, (req, res) => userController.find(req, res));
router.get("/users/:id", authenticate, (req, res) =>
  userController.findOne(req, res)
);
router.patch("/users/:id", authenticate, upload.single("avatar"), (req, res) =>
  userController.update(req, res)
);
router.delete("/users/:id", authenticate, (req, res) =>
  userController.delete(req, res)
);

export default router;
