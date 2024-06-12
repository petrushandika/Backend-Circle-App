"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LoginController_1 = __importDefault(require("../controllers/LoginController"));
const LoginService_1 = __importDefault(require("../services/LoginService"));
const router = express_1.default.Router();
const loginService = new LoginService_1.default();
const loginController = new LoginController_1.default(loginService);
router.post("/auth/login", (req, res) => loginController.login(req, res));
exports.default = router;
//# sourceMappingURL=LoginRoutes.js.map