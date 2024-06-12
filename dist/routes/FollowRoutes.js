"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FollowController_1 = __importDefault(require("../controllers/FollowController"));
const FollowService_1 = __importDefault(require("../services/FollowService"));
const router = express_1.default.Router();
const followService = new FollowService_1.default();
const followController = new FollowController_1.default(followService);
router.get("/followers/:id", (req, res) => followController.getFollowers(req, res));
router.get("/following/:id", (req, res) => followController.getFollowing(req, res));
router.post("/add-follower", (req, res) => followController.addFollower(req, res));
router.delete("/delete-follower", (req, res) => followController.deleteFollower(req, res));
exports.default = router;
//# sourceMappingURL=FollowRoutes.js.map