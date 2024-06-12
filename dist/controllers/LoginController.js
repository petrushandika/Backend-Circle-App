"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoginController {
    constructor(loginService) {
        this.loginService = loginService;
    }
    async login(req, res) {
        const dto = req.body;
        try {
            const user = await this.loginService.login(dto);
            res.status(200).json(user);
        }
        catch (error) {
            console.error("Error logging in:", error);
            res.status(500).send("Internal Server Error");
        }
    }
}
exports.default = LoginController;
//# sourceMappingURL=LoginController.js.map