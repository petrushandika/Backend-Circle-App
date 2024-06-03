import { PrismaClient } from "@prisma/client";

class FollowService {
  private readonly prisma = new PrismaClient();

  async getFollowers(userId: number) {
    try {
      const followers = await this.prisma.follow.findMany({
        where: { followingId: userId },
        include: { follower: true },
      });
      return followers.map((follow) => follow.follower);
    } catch (error) {
      throw new Error("Error retrieving followers");
    }
  }

  async getFollowing(userId: number) {
    try {
      const following = await this.prisma.follow.findMany({
        where: { followersId: userId },
        include: { following: true },
      });
      return following.map((follow) => follow.following);
    } catch (error) {
      throw new Error("Error retrieving following");
    }
  }

  async addFollower(userId: number, followerId: number) {
    try {
      await this.prisma.follow.create({
        data: {
          followersId: userId,
          followingId: followerId,
        },
      });
    } catch (error) {
      console.error("Detailed error:", error);
      throw new Error("Error adding follower");
    }
  }

  async deleteFollower(userId: number, followerId: number) {
    try {
      await this.prisma.follow.deleteMany({
        where: {
          followersId: userId,
          followingId: followerId,
        },
      });
    } catch (error) {
      console.error("Detailed error:", error);
      throw new Error("Error deleting follower");
    }
  }
}

export default FollowService;
