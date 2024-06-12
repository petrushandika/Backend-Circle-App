"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class FollowService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async getFollowers(userId) {
        try {
            const followers = await this.prisma.follow.findMany({
                where: { followingId: userId },
                include: { follower: true },
            });
            return followers.map((follow) => follow.follower);
        }
        catch (error) {
            throw new Error("Error retrieving followers");
        }
    }
    async getFollowing(userId) {
        try {
            const following = await this.prisma.follow.findMany({
                where: { followersId: userId },
                include: { following: true },
            });
            return following.map((follow) => follow.following);
        }
        catch (error) {
            throw new Error("Error retrieving following");
        }
    }
    async addFollower(userId, followerId) {
        try {
            await this.prisma.follow.create({
                data: {
                    followersId: userId,
                    followingId: followerId,
                },
            });
        }
        catch (error) {
            console.error("Detailed error:", error);
            throw new Error("Error adding follower");
        }
    }
    async deleteFollower(userId, followerId) {
        try {
            await this.prisma.follow.deleteMany({
                where: {
                    followersId: userId,
                    followingId: followerId,
                },
            });
        }
        catch (error) {
            console.error("Detailed error:", error);
            throw new Error("Error deleting follower");
        }
    }
}
exports.default = FollowService;
//# sourceMappingURL=FollowService.js.map