"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RegisterController_1 = __importDefault(require("../controllers/RegisterController"));
const RegisterService_1 = __importDefault(require("../services/RegisterService"));
const router = express_1.default.Router();
const registerService = new RegisterService_1.default();
const registerController = new RegisterController_1.default(registerService);
router.post("/auth/register", (req, res) => registerController.register(req, res));
exports.default = router;
//# sourceMappingURL=RegisterRoutes.js.map