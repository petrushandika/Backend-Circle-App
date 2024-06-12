"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LikeController {
    constructor(likeService) {
        this.likeService = likeService;
    }
    async find(req, res) {
        try {
            const likes = await this.likeService.find();
            res.json({ likes });
        }
        catch (error) {
            console.error("Error retrieving likes:", error);
            res.status(500).send("Internal Server Error");
        }
    }
    async findOne(req, res) {
        const { id } = req.params;
        try {
            const like = await this.likeService.findOne(Number(id));
            if (!like) {
                res.status(404).send("Like not found");
                return;
            }
            res.json(like);
        }
        catch (error) {
            console.error("Error retrieving like:", error);
            res.status(500).send("Internal Server Error");
        }
    }
    async create(req, res) {
        const dto = req.body;
        try {
            const like = await this.likeService.create(dto);
            res.status(201).json(like);
        }
        catch (error) {
            console.error("Error creating like:", error);
            res.status(500).send("Internal Server Error");
        }
    }
    async delete(req, res) {
        const { id } = req.params;
        try {
            const deletedLike = await this.likeService.delete(Number(id));
            if (!deletedLike) {
                res.status(404).send("Like not found");
                return;
            }
            res.status(200).json(deletedLike);
        }
        catch (error) {
            console.error("Error deleting like:", error);
            res.status(500).send("Internal Server Error");
        }
    }
}
exports.default = LikeController;
//# sourceMappingURL=LikeController.js.map