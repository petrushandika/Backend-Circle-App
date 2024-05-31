import { Request, Response } from "express";
import ThreadService from "../services/ThreadService";
import { ThreadDTO } from "../types/ThreadDTO";

class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

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

  async create(req: Request, res: Response) {
    const dto = req.body as ThreadDTO;

    try {
      const thread = await this.threadService.create(dto);
      res.status(201).json(thread);
    } catch (error) {
      console.error("Error creating thread:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const dto = req.body as ThreadDTO;

    try {
      const updatedThread = await this.threadService.update(Number(id), dto);
      if (!updatedThread) {
        res.status(404).send("Thread not found");
        return;
      }
      res.status(200).json(updatedThread);
    } catch (error) {
      console.error("Error updating thread:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const deletedThread = await this.threadService.delete(Number(id));
      if (!deletedThread) {
        res.status(404).send("Thread not found");
        return;
      }
      res.status(200).json(deletedThread);
    } catch (error) {
      console.error("Error deleting thread:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

export default ThreadController;
