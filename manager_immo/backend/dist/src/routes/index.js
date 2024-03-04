"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./auth.route"));
const property_route_1 = __importDefault(require("./property.route"));
const propertyHistory_route_1 = __importDefault(require("./propertyHistory.route"));
const appRouter = express_1.default.Router();
appRouter.use("/auth", auth_route_1.default);
appRouter.use("/properties", property_route_1.default);
appRouter.use("/propertyHistory", propertyHistory_route_1.default);
exports.default = appRouter;
