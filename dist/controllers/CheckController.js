"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CheckController {
    constructor() {
        this.check = async (req, res) => {
            try {
                const user = res.locals.user;
                res.status(200).json(user);
            }
            catch (error) {
                console.error("Error checking user:", error);
                res.status(500).json({ message: "Internal Server Error" });
            }
        };
    }
}
exports.default = CheckController;
//# sourceMappingURL=CheckController.js.map