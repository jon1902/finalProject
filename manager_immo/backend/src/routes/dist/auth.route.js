"use strict";
exports.__esModule = true;
var express_1 = require("express");
var auth_controller_1 = require("../controllers/auth.controller");
var authRouter = express_1["default"].Router();
authRouter.post("/login", auth_controller_1.AuthController.login);
authRouter.post("/register", auth_controller_1.AuthController.register);
exports["default"] = authRouter;
