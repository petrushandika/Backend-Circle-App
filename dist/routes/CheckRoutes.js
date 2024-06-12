"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Authenticate_1 = require("../middlewares/Authenticate");
const CheckController_1 = __importDefault(require("../controllers/CheckController"));
const router = express_1.default.Router();
const checkController = new CheckController_1.default();
router.post("/auth/check", Authenticate_1.authenticate, (req, res) => checkController.check(req, res));
exports.default = router;
//# sourceMappingURL=CheckRoutes.js.map