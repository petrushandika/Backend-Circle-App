"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ThreadController_1 = __importDefault(require("../controllers/ThreadController"));
const ThreadService_1 = __importDefault(require("../services/ThreadService"));
const Authenticate_1 = require("../middlewares/Authenticate");
const UploadFile_1 = __importDefault(require("../middlewares/UploadFile"));
const router = express_1.default.Router();
const threadService = new ThreadService_1.default();
const threadController = new ThreadController_1.default(threadService);
router.get("/threads", Authenticate_1.authenticate, (req, res) => threadController.find(req, res));
router.get("/threads/:id", Authenticate_1.authenticate, (req, res) => threadController.findOne(req, res));
router.post("/threads", Authenticate_1.authenticate, UploadFile_1.default.single("image"), (req, res) => threadController.create(req, res));
router.patch("/threads/:id", Authenticate_1.authenticate, UploadFile_1.default.single("image"), (req, res) => threadController.update(req, res));
router.delete("/threads/:id", Authenticate_1.authenticate, (req, res) => threadController.delete(req, res));
exports.default = router;
//# sourceMappingURL=ThreadRoutes.js.map