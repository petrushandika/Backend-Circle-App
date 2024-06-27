import { Request, Response } from "express";
import ThreadService from "../services/ThreadService";
import { ThreadDTO } from "../types/ThreadDTO";
import { redisClient } from "../libs/redis";

class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  async find(req: Request, res: Response) {
    try {
      const threads = await this.threadService.find();
      await redisClient.set("THREADS_DATA", JSON.stringify(threads), {
        EX: 5,
      });
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
    /* 
      #swagger.requestBody = {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              $ref: '#/components/schemas/CreateThreadDTO'
            }
          }
        }
      } 
    */
    const dto: ThreadDTO = {
      content: req.body.content,
      userId: res.locals.user ? res.locals.user.id : null,
    };

    if (req.file) {
      dto.image = req.file.path;
    }
    
    try {
      await redisClient.del("THREADS_DATA");
      const thread = await this.threadService.create(dto);
      res.status(201).json(thread);
    } catch (error) {
      console.error("Error creating thread:", error);
      res
        .status(500)
        .send(
          `Internal Server Error: ${
            error instanceof Error ? error.message : ""
          }`
        );
    }
  }

  async update(req: Request, res: Response) {
    /* 
      #swagger.requestBody = {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              $ref: '#/components/schemas/UpdateThreadDTO'
            }
          }
        }
      } 
    */
    const { id } = req.params;
    const dto = req.body as ThreadDTO;

    try {
      if (req.file) {
        dto.image = req.file.path
      }

      await this.threadService.update(Number(id), dto);
      const updatedThread = await this.threadService.findOne(Number(id));
      if (!updatedThread) {
        res.status(404).send("Thread not found after update");
        return;
      }
      res.status(200).json(updatedThread);
    } catch (error) {
      console.error("Error updating thread:", error);
      res
        .status(500)
        .send(
          `Internal Server Error: ${
            error instanceof Error ? error.message : ""
          }`
        );
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await this.threadService.delete(Number(id));
      res.status(200).send("Thread deleted successfully");
    } catch (error) {
      console.error("Error deleting thread:", error);
      res
        .status(500)
        .send(
          `Internal Server Error: ${
            error instanceof Error ? error.message : ""
          }`
        );
    }
  }
}

export default ThreadController;
