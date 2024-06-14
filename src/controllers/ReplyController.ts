import { Request, Response } from "express";
import ReplyService from "../services/ReplyService";
import { ReplyDTO } from "../types/ReplyDTO";

class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  async find(req: Request, res: Response) {
    try {
      const replies = await this.replyService.find();
      res.json({ replies });
    } catch (error) {
      console.error("Error retrieving replies:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const reply = await this.replyService.findOne(Number(id));
      if (!reply) {
        res.status(404).send("Reply not found");
        return;
      }
      res.json(reply);
    } catch (error) {
      console.error("Error retrieving reply:", error);
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
              $ref: '#/components/schemas/ReplyDTO'
            }
          }
        }
      } 
    */
    const dto = req.body as ReplyDTO;

    try {
      const reply = await this.replyService.create(dto);
      res.status(201).json(reply);
    } catch (error) {
      console.error("Error creating reply:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async update(req: Request, res: Response) {
    /* 
      #swagger.requestBody = {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              $ref: '#/components/schemas/ReplyDTO'
            }
          }
        }
      } 
    */
    const { id } = req.params;
    const dto = req.body as ReplyDTO;

    try {
      const updatedReply = await this.replyService.update(Number(id), dto);
      if (!updatedReply) {
        res.status(404).send("Reply not found");
        return;
      }
      res.status(200).json(updatedReply);
    } catch (error) {
      console.error("Error updating reply:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const deletedReply = await this.replyService.delete(Number(id));
      if (!deletedReply) {
        res.status(404).send("Reply not found");
        return;
      }
      res.status(200).json(deletedReply);
    } catch (error) {
      console.error("Error deleting reply:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

export default ReplyController;
