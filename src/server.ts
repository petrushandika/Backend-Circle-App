import express from "express";
import cors from "cors";
import ThreadController from "./controllers/ThreadController";
import AuthController from "./controllers/AuthController";
import ThreadService from "./services/ThreadService";
import AuthService from "./services/AuthService";

const app = express();
const port = 3000;
const router = express.Router();
const threadService = new ThreadService();
const threadController = new ThreadController(threadService);

const authService = new AuthService();
const authController = new AuthController(authService);

app.use(cors());
app.use(express.json());
app.use("/api/v", router);

app.get("/", (req, res) => {
  res.send("Hello, welcome to circle!");
});

// Threads routes
router.get("/threads", (req, res) => threadController.find(req, res));
router.get("/threads/:id", (req, res) => threadController.findOne(req, res));
router.post("/threads", (req, res) => threadController.create(req, res));
router.patch("/threads/:id", (req, res) => threadController.update(req, res));
router.delete("/threads/:id", (req, res) => threadController.delete(req, res));

// Auth routes
router.post("/auth/login", (req, res) => authController.login(req, res));
router.post("/auth/register", (req, res) => authController.register(req, res));

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
