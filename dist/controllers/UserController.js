"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async find(req, res) {
        const search = req.query.search;
        try {
            const users = await this.userService.find(search);
            res.json({ users });
        }
        catch (error) {
            console.error("Error retrieving users:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    async findOne(req, res) {
        const userId = res.locals.user.id;
        try {
            const user = await this.userService.findOne(userId);
            if (!user) {
                res.status(404).json({ error: "User not found" });
            }
            else {
                res.json(user);
            }
        }
        catch (error) {
            console.error("Error retrieving user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    async create(req, res) {
        const dto = req.body;
        try {
            const user = await this.userService.create(dto);
            res.status(201).json(user);
        }
        catch (error) {
            console.error("Error creating user:", error);
            res.status(400).json({ error: "Error creating user" });
        }
    }
    async update(req, res) {
        const { id } = req.params;
        const dto = req.body;
        try {
            const updatedUser = await this.userService.update(Number(id), dto);
            if (!updatedUser) {
                res.status(404).json({ error: "User not found" });
            }
            else {
                res.status(200).json(updatedUser);
            }
        }
        catch (error) {
            console.error("Error updating user:", error);
            res.status(400).json({ error: "Error updating user" });
        }
    }
    async delete(req, res) {
        const { id } = req.params;
        try {
            await this.userService.delete(Number(id));
            res.status(200).json({ message: "User deleted successfully" });
        }
        catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map