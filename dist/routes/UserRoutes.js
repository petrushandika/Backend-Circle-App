"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const UserService_1 = __importDefault(require("../services/UserService"));
const Authenticate_1 = require("../middlewares/Authenticate");
const router = express_1.default.Router();
const userService = new UserService_1.default();
const userController = new UserController_1.default(userService);
router.get("/users", Authenticate_1.authenticate, (req, res) => userController.find(req, res));
router.get("/users/:id", Authenticate_1.authenticate, (req, res) => userController.findOne(req, res));
router.patch("/users/:id", Authenticate_1.authenticate, (req, res) => userController.update(req, res));
router.delete("/users/:id", Authenticate_1.authenticate, (req, res) => userController.delete(req, res));
exports.default = router;
//# sourceMappingURL=UserRoutes.js.map