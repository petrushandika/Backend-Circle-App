import { Request, Response } from "express";
import FollowService from "../services/FollowService";

class FollowController {
  constructor(private readonly followService: FollowService) {}

  async getFollowers(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const followers = await this.followService.getFollowers(Number(id));
      res.json(followers);
    } catch (error) {
      console.error("Error retrieving followers:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async getFollowing(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const following = await this.followService.getFollowing(Number(id));
      res.json(following);
    } catch (error) {
      console.error("Error retrieving following:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async addFollower(req: Request, res: Response) {
    const { followingId, followersId } = req.body;

    try {
      await this.followService.addFollower(followingId, followersId);
      res.status(201).send("Follower added successfully");
    } catch (error) {
      console.error("Error adding follower:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async deleteFollower(req: Request, res: Response) {
    const { followingId, followersId } = req.body;

    try {
      await this.followService.deleteFollower(followingId, followersId);
      res.status(500).send("Follower deleted successfully");
    } catch (error) {
      console.error("Error deleting follower:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

export default FollowController;
