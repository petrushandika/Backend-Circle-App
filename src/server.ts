import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import ThreadController from "./controllers/ThreadController";
import ThreadService from "./services/ThreadService";

const app = express();
const port = 3000;
const router = express.Router();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use("/api/v", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello welcome to circle!");
});

// Type DTO
type ThreadDTO = {
  content: string;
  totalReplies?: number;
  userId: number;
};

// Get a single thread by ID
router.get("/threads/:id", async (req: Request, res: Response) => {
  const threadService = new ThreadService();
  const threadController = new ThreadController(threadService);
  await threadController.findOne(req, res);
});

// Get all threads
router.get("/threads", async (req: Request, res: Response) => {
  const threadController = new ThreadController(new ThreadService());
  await threadController.find(req, res);
});

// Create a new thread
router.post("/threads", async (req: Request, res: Response) => {
  const dto = req.body as ThreadDTO;

  try {
    const thread = await prisma.thread.create({
      data: {
        content: dto.content,
        totalReplies: dto.totalReplies || 0,
        userId: dto.userId,
      },
    });

    res.status(201).json(thread);
  } catch (error) {
    res.status(500).send("Error creating thread");
  }
});

// Update a thread by ID
router.patch("/threads/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const dto = req.body as ThreadDTO;

  try {
    let thread = await prisma.thread.findFirst({
      where: { id: Number(id) },
    });

    if (!thread) {
      res.status(404).send("Thread not found");
      return;
    }

    if (dto.content) {
      thread.content = dto.content;
    }

    if (dto.totalReplies) {
      thread.totalReplies = dto.totalReplies;
    }

    if (dto.userId) {
      thread.userId = dto.userId;
    }

    const updatedThread = await prisma.thread.update({
      where: { id: Number(id) },
      data: { ...thread },
    });

    res.status(200).json(updatedThread);
  } catch (error) {
    console.error("Error updating thread:", error);
    res.status(500).send("Error updating thread");
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
