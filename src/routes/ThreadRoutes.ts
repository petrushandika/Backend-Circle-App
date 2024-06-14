import express, { Request, Response } from "express";
import { Router } from "express";
import ThreadController from "../controllers/ThreadController";
import ThreadService from "../services/ThreadService";
import { authenticate } from "../middlewares/Authenticate";
import upload from "../middlewares/UploadFile";
import { redisCheck } from "../middlewares/Redis";

const router: Router = express.Router();
const threadService = new ThreadService();
const threadController = new ThreadController(threadService);

router.get(
  "/threads",
  authenticate,
  redisCheck,
  (req: Request, res: Response) => threadController.find(req, res)
);

router.get("/threads/:id", authenticate, (req: Request, res: Response) =>
  threadController.findOne(req, res)
);

router.post(
  "/threads",
  authenticate,
  upload.single("image"),
  (req: Request, res: Response) => threadController.create(req, res)
);

router.patch(
  "/threads/:id",
  authenticate,
  upload.single("image"),
  (req: Request, res: Response) => threadController.update(req, res)
);

router.delete("/threads/:id", authenticate, (req: Request, res: Response) =>
  threadController.delete(req, res)
);

export default router;
