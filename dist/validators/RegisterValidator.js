"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.RegisterSchema = joi_1.default.object({
    username: joi_1.default.string().min(1).max(255).required(),
    fullName: joi_1.default.string().min(1).max(255).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    avatar: joi_1.default.string().optional(),
    bio: joi_1.default.string().optional(),
});
//# sourceMappingURL=RegisterValidator.js.map