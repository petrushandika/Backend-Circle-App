"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FollowController {
    constructor(followService) {
        this.followService = followService;
    }
    async getFollowers(req, res) {
        const { id } = req.params;
        try {
            const followers = await this.followService.getFollowers(Number(id));
            res.json(followers);
        }
        catch (error) {
            console.error("Error retrieving followers:", error);
            res.status(500).send("Internal Server Error");
        }
    }
    async getFollowing(req, res) {
        const { id } = req.params;
        try {
            const following = await this.followService.getFollowing(Number(id));
            res.json(following);
        }
        catch (error) {
            console.error("Error retrieving following:", error);
            res.status(500).send("Internal Server Error");
        }
    }
    async addFollower(req, res) {
        const { followingId, followersId } = req.body;
        try {
            await this.followService.addFollower(followingId, followersId);
            res.status(201).send("Follower added successfully");
        }
        catch (error) {
            console.error("Error adding follower:", error);
            res.status(500).send("Internal Server Error");
        }
    }
    async deleteFollower(req, res) {
        const { followingId, followersId } = req.body;
        try {
            await this.followService.deleteFollower(followingId, followersId);
            res.status(500).send("Follower deleted successfully");
        }
        catch (error) {
            console.error("Error deleting follower:", error);
            res.status(500).send("Internal Server Error");
        }
    }
}
exports.default = FollowController;
//# sourceMappingURL=FollowController.js.map