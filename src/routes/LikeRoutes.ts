import express from "express";
import { Router } from "express";
import LikeController from "../controllers/LikeController";
import LikeService from "../services/LikeService";

const router: Router = express.Router();
const likeService = new LikeService();
const likeController = new LikeController(likeService);

router.get("/likes", (req, res) => likeController.find(req, res));
router.get("/likes/:id", (req, res) => likeController.findOne(req, res));
router.post("/likes", (req, res) => likeController.create(req, res));
router.delete("/likes/:id", (req, res) => likeController.delete(req, res));

export default router;
