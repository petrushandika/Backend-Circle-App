import express from "express";
import CheckRoutes from "./routes/CheckRoutes";
import RegisterRoutes from "./routes/RegisterRoutes";
import LoginRoutes from "./routes/LoginRoutes";
import UserRoutes from "./routes/UserRoutes";
import ThreadRoutes from "./routes/ThreadRoutes";
import LikeRoutes from "./routes/LikeRoutes";
import RepliesRoutes from "./routes/RepliesRoutes";
import FollowRoutes from "./routes/FollowRoutes";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to version One!");
});

router.use(CheckRoutes);
router.use(RegisterRoutes);
router.use(LoginRoutes);
router.use(UserRoutes);
router.use(ThreadRoutes);
router.use(LikeRoutes);
router.use(RepliesRoutes);
router.use(FollowRoutes);

export default router;
