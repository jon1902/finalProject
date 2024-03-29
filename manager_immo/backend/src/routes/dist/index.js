"use strict";
exports.__esModule = true;
var express_1 = require("express");
var auth_route_1 = require("./auth.route");
var property_route_1 = require("./property.route");
var propertyHistory_route_1 = require("./propertyHistory.route");
var appRouter = express_1["default"].Router();
appRouter.use("/auth", auth_route_1["default"]);
appRouter.use("/properties", property_route_1["default"]);
appRouter.use("/propertyHistory", propertyHistory_route_1["default"]);
exports["default"] = appRouter;
