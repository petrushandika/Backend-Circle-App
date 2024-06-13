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

router.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

router.use(CheckRoutes);
router.use(RegisterRoutes);
router.use(LoginRoutes);
router.use(UserRoutes);
router.use(ThreadRoutes);
router.use(LikeRoutes);
router.use(RepliesRoutes);
router.use(FollowRoutes);

router.get("/", (req, res) => {
  console.log("GET /api/v");
  res.send("Welcome to version One!");
});

export default router;
