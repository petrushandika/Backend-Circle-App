import { Request, Response } from "express";
import UserService from "../services/UserService";
import { UserDTO } from "../types/UserDTO";

class UserController {
  constructor(private readonly userService: UserService) {}

  async find(req: Request, res: Response) {
    const search = req.query.search as string;
    try {
      const users = await this.userService.find(search);
      res.json({ users });
    } catch (error) {
      console.error("Error retrieving users:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async findOne(req: Request, res: Response) {
    const userId = res.locals.user.id;
    try {
      const user = await this.userService.findOne(Number(userId));
      if (!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.json(user);
      }
    } catch (error) {
      console.error("Error retrieving user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async create(req: Request, res: Response) {
    /* 
      #swagger.requestBody = {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              $ref: '#/components/schemas/CreateUserDTO'
            }
          }
        }
      } 
    */
    const dto = req.body as UserDTO;
    try {
      const user = await this.userService.create(dto);
      res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(400).json({ error: "Error creating user" });
    }
  }

  async update(req: Request, res: Response) {
    /* 
      #swagger.requestBody = {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              $ref: '#/components/schemas/UpdateUserDTO'
            }
          }
        }
      } 
    */
    const { id } = req.params;
    const dto = req.body as UserDTO;

    try {
      await this.userService.update(Number(id), dto);
      const updatedUser = await this.userService.findOne(Number(id));
      if (!updatedUser) {
        res.status(404).json({ error: "User not found after update" });
        return;
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
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
      await this.userService.delete(Number(id));
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default UserController;
