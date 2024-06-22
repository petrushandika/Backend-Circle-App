import { Request, Response } from "express";
import LikeService from "../services/LikeService";
import { LikeDTO } from "../types/LikeDTO";

class LikeController {
  constructor(private readonly likeService: LikeService) {}

  async find(req: Request, res: Response) {
    try {
      const likes = await this.likeService.find();
      res.json({ likes });
    } catch (error) {
      console.error("Error retrieving likes:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  // async findOne(req: Request, res: Response) {
  //   const { id } = req.params;

  //   try {
  //     const like = await this.likeService.findOne(Number(id));
  //     if (!like) {
  //       res.status(404).send("Like not found");
  //       return;
  //     }
  //     res.json(like);
  //   } catch (error) {
  //     console.error("Error retrieving like:", error);
  //     res.status(500).send("Internal Server Error");
  //   }
  // }

  async findOne(req: Request, res: Response) {
    const { userId, threadId } = req.query;

    console.log(req.query);
    try {
      const like = await this.likeService.findOne(
        Number(userId),
        Number(threadId)
      );
      if (!like) {
        res.status(404).send("Like not found");
        return;
      }
      res.json(like);
    } catch (error) {
      console.error("Error retrieving like:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async create(req: Request, res: Response) {
    /* 
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: '#/components/schemas/LikeDTO'
            }
          }
        }
      } 
    */
    const dto = req.body as LikeDTO;

    try {
      const like = await this.likeService.create(dto);
      res.status(201).json(like);
    } catch (error) {
      console.error("Error creating like:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async delete(req: Request, res: Response) {
    const { userId, threadId } = req.body;

    try {
      await this.likeService.delete(Number(userId), Number(threadId));
      res.status(200).send("Like deleted succesfully");
    } catch (error) {
      console.error("Error deleting like:", error);
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

export default LikeController;
