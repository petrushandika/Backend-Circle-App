import express from "express";
import cors from "cors";
import RegisterService from "./services/RegisterService";
import RegisterController from "./controllers/RegisterController";
import LoginService from "./services/LoginService";
import LoginController from "./controllers/LoginController";
import UserService from "./services/UserService";
import UserController from "./controllers/UserController";
import ThreadService from "./services/ThreadService";
import ThreadController from "./controllers/ThreadController";
import LikeService from "./services/LikeService";
import LikeController from "./controllers/LikeController";
import ReplyService from "./services/ReplyService";
import ReplyController from "./controllers/ReplyController";
import dotenv from "dotenv";
import upload from "./middlewares/UploadThread";
dotenv.config();

const app = express();
const port = 3000;
const router = express.Router();

const registerService = new RegisterService();
const registerController = new RegisterController(registerService);

const loginService = new LoginService();
const loginController = new LoginController(loginService);

const userService = new UserService();
const userController = new UserController(userService);

const threadService = new ThreadService();
const threadController = new ThreadController(threadService);

const likeService = new LikeService();
const likeController = new LikeController(likeService);

const replyService = new ReplyService();
const replyController = new ReplyController(replyService);

app.use(cors());
app.use(express.json());
app.use("/api/v", router);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hello, welcome to circle!");
});

// Login routes
router.post("/auth/login", (req, res) => loginController.login(req, res));

// Register routes
router.post("/auth/register", (req, res) =>
  registerController.register(req, res)
);

// Users routes
router.get("/users", (req, res) => userController.find(req, res));
router.get("/users/:id", (req, res) => userController.findOne(req, res));
router.patch("/users/:id", (req, res) => userController.update(req, res));
router.delete("/users/:id", (req, res) => userController.delete(req, res));

// Threads routes
router.get("/threads", (req, res) => threadController.find(req, res));
router.get("/threads/:id", (req, res) => threadController.findOne(req, res));
router.post("/threads", upload.single("image"), (req, res) =>
  threadController.create(req, res)
);
router.patch("/threads/:id", (req, res) => threadController.update(req, res));
router.delete("/threads/:id", (req, res) => threadController.delete(req, res));

// Like routes
router.get("/likes", (req, res) => likeController.find(req, res));
router.get("/likes/:id", (req, res) => likeController.findOne(req, res));
router.post("/likes", (req, res) => likeController.create(req, res));
router.delete("/likes/:id", (req, res) => likeController.delete(req, res));

// Replies routes
router.get("/replies", (req, res) => replyController.find(req, res));
router.get("/replies/:id", (req, res) => replyController.findOne(req, res));
router.post("/replies", (req, res) => replyController.create(req, res));
router.patch("/replies/:id", (req, res) => replyController.update(req, res));
router.delete("/replies/:id", (req, res) => replyController.delete(req, res));

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
