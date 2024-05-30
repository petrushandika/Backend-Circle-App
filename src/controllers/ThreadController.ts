import { Request, Response } from "express";
import ThreadService from "../services/ThreadService";

class ThreadController {
  private readonly threadService: ThreadService;

  constructor(threadService: ThreadService) {
    this.threadService = threadService;
  }

  async find(req: Request, res: Response) {
    try {
      const threads = await this.threadService.find();
      res.json({ threads });
    } catch (error) {
      console.error("Error retrieving threads:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const thread = await this.threadService.findOne(Number(id));
      if (!thread) {
        res.status(404).send("Thread not found");
        return;
      }
      res.json(thread);
    } catch (error) {
      console.error("Error retrieving thread:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

export default ThreadController;
