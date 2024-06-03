import { Request, Response } from "express";
import UserService from "../services/UserService";
import { UserDTO } from "../types/UserDTO";

class UserController {
  constructor(private readonly userService: UserService) {}

  async find(req: Request, res: Response) {
    try {
      const users = await this.userService.find();
      res.json({ users });
    } catch (error) {
      console.error("Error retrieving users:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await this.userService.findOne(Number(id));
      if (!user) {
        res.status(404).send("User not found");
      } else {
        res.json(user);
      }
    } catch (error) {
      console.error("Error retrieving user:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async create(req: Request, res: Response) {
    const dto = req.body as UserDTO;

    try {
      const user = await this.userService.create(dto);
      res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const dto = req.body as UserDTO;

    try {
      const updatedUser = await this.userService.update(Number(id), dto);
      if (!updatedUser) {
        res.status(404).send("User not found");
      } else {
        res.status(200).json(updatedUser);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await this.userService.delete(Number(id));
      res.status(200).send("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

export default UserController;
