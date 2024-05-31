// src/index.ts
import express from "express";
import cors from "cors";
import ThreadController from "./controllers/ThreadController";
import ThreadService from "./services/ThreadService";

const app = express();
const port = 3000;
const router = express.Router();
const threadService = new ThreadService();
const threadController = new ThreadController(threadService);

app.use(cors());
app.use(express.json());
app.use("/api/v", router);

app.get("/", (req, res) => {
  res.send("Hello, welcome to circle!");
});

// Get all threads
router.get("/threads", (req, res) => threadController.find(req, res));

// Get a single thread by ID
router.get("/threads/:id", (req, res) => threadController.findOne(req, res));

// Create a new thread
router.post("/threads", (req, res) => threadController.create(req, res));

// Update a thread by ID
router.patch("/threads/:id", (req, res) => threadController.update(req, res));

// Delete a thread by ID
router.delete("/threads/:id", (req, res) => threadController.delete(req, res));

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
