import express from "express";
import { Router } from "express";
import FollowController from "../controllers/FollowController";
import FollowService from "../services/FollowService";

const router: Router = express.Router();
const followService = new FollowService();
const followController = new FollowController(followService);

router.get("/followers/:id", (req, res) =>
  followController.getFollowers(req, res)
);
router.get("/following/:id", (req, res) =>
  followController.getFollowing(req, res)
);
router.post("/add-follower", (req, res) =>
  followController.addFollower(req, res)
);
router.delete("/delete-follower", (req, res) =>
  followController.deleteFollower(req, res)
);

export default router;
