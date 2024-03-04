"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const property_controller_1 = require("../controllers/property.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const propertyRouter = express_1.default.Router();
propertyRouter.get("/:propertyId", auth_middleware_1.AuthMiddleware.isConnected, property_controller_1.PropertyController.findById);
propertyRouter.get("/", auth_middleware_1.AuthMiddleware.isConnected, property_controller_1.PropertyController.findAll);
propertyRouter.post("/", auth_middleware_1.AuthMiddleware.isConnected, property_controller_1.PropertyController.create);
propertyRouter.patch("/:propertyId", auth_middleware_1.AuthMiddleware.isConnected, property_controller_1.PropertyController.update);
propertyRouter.delete("/:propertyId", auth_middleware_1.AuthMiddleware.isConnected, property_controller_1.PropertyController.delete);
exports.default = propertyRouter;
