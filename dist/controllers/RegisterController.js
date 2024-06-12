"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegisterController {
    constructor(registerService) {
        this.registerService = registerService;
    }
    async register(req, res) {
        const dto = req.body;
        try {
            const user = await this.registerService.register(dto);
            res.status(201).json(user);
        }
        catch (error) {
            console.error("Error registering:", error.message);
            if (error.message.includes("already exists")) {
                res.status(409).send(error.message);
            }
            else if (error.message.includes("Validation error")) {
                res.status(400).send(error.message);
            }
            else {
                res.status(500).send("Internal Server Error");
            }
        }
    }
}
exports.default = RegisterController;
//# sourceMappingURL=RegisterController.js.map