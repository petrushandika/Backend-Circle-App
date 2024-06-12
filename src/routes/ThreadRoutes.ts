import express from "express";
import { Router } from "express";
import ThreadController from "../controllers/ThreadController";
import ThreadService from "../services/ThreadService";
import { authenticate } from "../middlewares/Authenticate";
import upload from "../middlewares/UploadFile";

const router: Router = express.Router();
const threadService = new ThreadService();
const threadController = new ThreadController(threadService);

router.get("/threads", authenticate, (req, res) =>
  threadController.find(req, res)
);
router.get("/threads/:id", authenticate, (req, res) =>
  threadController.findOne(req, res)
);
router.post("/threads", authenticate, upload.single("image"), (req, res) =>
  threadController.create(req, res)
);
router.patch("/threads/:id", authenticate, upload.single("image"), (req, res) =>
  threadController.update(req, res)
);
router.delete("/threads/:id", authenticate, (req, res) =>
  threadController.delete(req, res)
);

export default router;
