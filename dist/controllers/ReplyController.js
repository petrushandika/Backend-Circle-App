"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReplyController {
    constructor(replyService) {
        this.replyService = replyService;
    }
    async find(req, res) {
        try {
            const replies = await this.replyService.find();
            res.json({ replies });
        }
        catch (error) {
            console.error("Error retrieving replies:", error);
            res.status(500).send("Internal Server Error");
        }
    }
    async findOne(req, res) {
        const { id } = req.params;
        try {
            const reply = await this.replyService.findOne(Number(id));
            if (!reply) {
                res.status(404).send("Reply not found");
                return;
            }
            res.json(reply);
        }
        catch (error) {
            console.error("Error retrieving reply:", error);
            res.status(500).send("Internal Server Error");
        }
    }
    async create(req, res) {
        const dto = req.body;
        try {
            const reply = await this.replyService.create(dto);
            res.status(201).json(reply);
        }
        catch (error) {
            console.error("Error creating reply:", error);
            res.status(500).send("Internal Server Error");
        }
    }
    async update(req, res) {
        const { id } = req.params;
        const dto = req.body;
        try {
            const updatedReply = await this.replyService.update(Number(id), dto);
            if (!updatedReply) {
                res.status(404).send("Reply not found");
                return;
            }
            res.status(200).json(updatedReply);
        }
        catch (error) {
            console.error("Error updating reply:", error);
            res.status(500).send("Internal Server Error");
        }
    }
    async delete(req, res) {
        const { id } = req.params;
        try {
            const deletedReply = await this.replyService.delete(Number(id));
            if (!deletedReply) {
                res.status(404).send("Reply not found");
                return;
            }
            res.status(200).json(deletedReply);
        }
        catch (error) {
            console.error("Error deleting reply:", error);
            res.status(500).send("Internal Server Error");
        }
    }
}
exports.default = ReplyController;
//# sourceMappingURL=ReplyController.js.map