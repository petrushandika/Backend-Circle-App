"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplySchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.ReplySchema = joi_1.default.object({
    userId: joi_1.default.number().optional(),
    threadId: joi_1.default.number().required(),
    image: joi_1.default.string().optional(),
    content: joi_1.default.string().min(1).max(255).required(),
});
//# sourceMappingURL=ReplyValidator.js.map