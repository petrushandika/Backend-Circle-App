import express from "express";
import { Router } from "express";
import ReplyController from "../controllers/ReplyController";
import ReplyService from "../services/ReplyService";

const router: Router = express.Router();
const replyService = new ReplyService();
const replyController = new ReplyController(replyService);

router.get("/replies", (req, res) => replyController.find(req, res));
router.get("/replies/:id", (req, res) => replyController.findOne(req, res));
router.post("/replies", (req, res) => replyController.create(req, res));
router.patch("/replies/:id", (req, res) => replyController.update(req, res));
router.delete("/replies/:id", (req, res) => replyController.delete(req, res));

export default router;
