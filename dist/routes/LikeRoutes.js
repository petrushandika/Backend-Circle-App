"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LikeController_1 = __importDefault(require("../controllers/LikeController"));
const LikeService_1 = __importDefault(require("../services/LikeService"));
const router = express_1.default.Router();
const likeService = new LikeService_1.default();
const likeController = new LikeController_1.default(likeService);
router.get("/likes", (req, res) => likeController.find(req, res));
router.get("/likes/:id", (req, res) => likeController.findOne(req, res));
router.post("/likes", (req, res) => likeController.create(req, res));
router.delete("/likes/:id", (req, res) => likeController.delete(req, res));
exports.default = router;
//# sourceMappingURL=LikeRoutes.js.map