"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.LikeSchema = joi_1.default.object({
    userId: joi_1.default.number().optional(),
    threadId: joi_1.default.number().required(),
});
//# sourceMappingURL=LikeValidator.js.map