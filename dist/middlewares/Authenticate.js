"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticate(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized!" });
    }
    const token = authorizationHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        return res.status(500).json({ error: "JWT secret not configured!" });
    }
    try {
        const user = jsonwebtoken_1.default.verify(token, jwtSecret);
        res.locals.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "Unauthorized!" });
    }
}
exports.authenticate = authenticate;
//# sourceMappingURL=Authenticate.js.map