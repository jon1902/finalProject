"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthMiddleware {
    static isConnected(req, res, next) {
        try {
            const { token } = req.cookies;
            if (!token) {
                return res.status(401).send({ error: "NO token !" });
            }
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                throw res.status(500).send({ error: "jwt secret is not defined" });
            }
            req.user = jsonwebtoken_1.default.verify(token, jwtSecret);
            next();
        }
        catch (err) {
            console.error(err);
            res.status(401).send({ error: err.message });
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
