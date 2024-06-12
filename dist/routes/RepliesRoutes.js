"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ReplyController_1 = __importDefault(require("../controllers/ReplyController"));
const ReplyService_1 = __importDefault(require("../services/ReplyService"));
const router = express_1.default.Router();
const replyService = new ReplyService_1.default();
const replyController = new ReplyController_1.default(replyService);
router.get("/replies", (req, res) => replyController.find(req, res));
router.get("/replies/:id", (req, res) => replyController.findOne(req, res));
router.post("/replies", (req, res) => replyController.create(req, res));
router.patch("/replies/:id", (req, res) => replyController.update(req, res));
router.delete("/replies/:id", (req, res) => replyController.delete(req, res));
exports.default = router;
//# sourceMappingURL=RepliesRoutes.js.map