import express, { Request, Response, NextFunction } from "express";
import { Router } from "express";
import ThreadController from "../controllers/ThreadController";
import ThreadService from "../services/ThreadService";
import { authenticate } from "../middlewares/Authenticate";
import upload from "../middlewares/UploadFile";
import { redisClient } from "../libs/redis";

const router: Router = express.Router();
const threadService = new ThreadService();
const threadController = new ThreadController(threadService);

router.get(
  "/threads",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await redisClient.get("THREADS_DATA");
      if (result) return res.json(JSON.parse(result));
      next();
    } catch (error) {
      console.error("Error fetching from Redis:", error);
      next();
    }
  },
  (req: Request, res: Response) => threadController.find(req, res)
);

router.get("/threads/:id", authenticate, (req: Request, res: Response) =>
  threadController.findOne(req, res)
);

router.post("/threads", authenticate, upload.single("image"), (req: Request, res: Response) =>
  threadController.create(req, res)
);

router.patch("/threads/:id", authenticate, upload.single("image"), (req: Request, res: Response) =>
  threadController.update(req, res)
);

router.delete("/threads/:id", authenticate, (req: Request, res: Response) =>
  threadController.delete(req, res)
);

export default router;
