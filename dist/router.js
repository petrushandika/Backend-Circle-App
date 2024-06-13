"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CheckRoutes_1 = __importDefault(require("./routes/CheckRoutes"));
const RegisterRoutes_1 = __importDefault(require("./routes/RegisterRoutes"));
const LoginRoutes_1 = __importDefault(require("./routes/LoginRoutes"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const ThreadRoutes_1 = __importDefault(require("./routes/ThreadRoutes"));
const LikeRoutes_1 = __importDefault(require("./routes/LikeRoutes"));
const RepliesRoutes_1 = __importDefault(require("./routes/RepliesRoutes"));
const FollowRoutes_1 = __importDefault(require("./routes/FollowRoutes"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("Welcome to version One!");
});
router.use(CheckRoutes_1.default);
router.use(RegisterRoutes_1.default);
router.use(LoginRoutes_1.default);
router.use(UserRoutes_1.default);
router.use(ThreadRoutes_1.default);
router.use(LikeRoutes_1.default);
router.use(RepliesRoutes_1.default);
router.use(FollowRoutes_1.default);
exports.default = router;
//# sourceMappingURL=router.js.map