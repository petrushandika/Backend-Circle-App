"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.ThreadSchema = joi_1.default.object({
    image: joi_1.default.string().optional(),
    content: joi_1.default.string().min(1).max(255).required(),
    totalLikes: joi_1.default.number().optional(),
    totalReplies: joi_1.default.number().optional(),
    userId: joi_1.default.number().required(),
});
//# sourceMappingURL=ThreadValidator.js.map