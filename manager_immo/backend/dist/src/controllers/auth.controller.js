"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
class AuthController {
    static setCookie(res, user) {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw res.status(500).send({ error: "jwt secret is not defined" });
        }
        const maxAge = 1000 * 60 * 60 * 24;
        const token = jsonwebtoken_1.default.sign({ userId: user.id, username: user.username }, jwtSecret, {
            expiresIn: maxAge,
        });
        res.cookie("token", token, { maxAge });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield user_model_1.UserModel.findOneWithEmail(email);
                if (!user) {
                    return res
                        .status(404)
                        .send({ error: "Email or password are incorrect" });
                }
                const isCorrectPassword = bcrypt_1.default.compareSync(password, user.password);
                if (!isCorrectPassword) {
                    return res
                        .status(401)
                        .send({ error: "Email or password are incorrect" });
                }
                AuthController.setCookie(res, user);
                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).send({ error: err.message });
            }
        });
    }
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = req.body;
                const salt = bcrypt_1.default.genSaltSync(10);
                const hashPassword = bcrypt_1.default.hashSync(password, salt);
                const user = yield user_model_1.UserModel.create({
                    username,
                    email,
                    password: hashPassword,
                });
                AuthController.setCookie(res, user);
                return res.status(201).send(user);
            }
            catch (err) {
                console.error(err);
                res.status(500).send({ error: err.message });
            }
        });
    }
}
exports.AuthController = AuthController;
