"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const propertyHistory_controller_1 = require("../controllers/propertyHistory.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const propertyHistoryRouter = express_1.default.Router();
propertyHistoryRouter.get("/properties/:propertyId", auth_middleware_1.AuthMiddleware.isConnected, propertyHistory_controller_1.PropertyHistoryController.findByPropertyId);
propertyHistoryRouter.get("/", auth_middleware_1.AuthMiddleware.isConnected, propertyHistory_controller_1.PropertyHistoryController.findByUserId);
propertyHistoryRouter.post("/properties/:propertyId", auth_middleware_1.AuthMiddleware.isConnected, propertyHistory_controller_1.PropertyHistoryController.create);
propertyHistoryRouter.patch("/:propertyHistoryId", auth_middleware_1.AuthMiddleware.isConnected, propertyHistory_controller_1.PropertyHistoryController.update);
propertyHistoryRouter.delete("/:propertyHistoryId", auth_middleware_1.AuthMiddleware.isConnected, propertyHistory_controller_1.PropertyHistoryController.delete);
exports.default = propertyHistoryRouter;
