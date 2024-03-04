"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.PropertyController = void 0;
var property_model_1 = require("../models/property.model");
var PropertyController = /** @class */ (function () {
    function PropertyController() {
    }
    PropertyController.findById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var propertyId, property, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        propertyId = req.params.propertyId;
                        return [4 /*yield*/, property_model_1.PropertyModel.findById(propertyId)];
                    case 1:
                        property = _a.sent();
                        if (!property) {
                            return [2 /*return*/, res.status(404).send("Property " + propertyId + " not found")];
                        }
                        return [2 /*return*/, res.status(200).send(property)];
                    case 2:
                        err_1 = _a.sent();
                        console.error(err_1);
                        res.status(500).send({ error: err_1.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PropertyController.findAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, properties, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.user.userId;
                        return [4 /*yield*/, property_model_1.PropertyModel.findAllByUserId(userId)];
                    case 1:
                        properties = _a.sent();
                        return [2 /*return*/, res.status(200).send(properties)];
                    case 2:
                        err_2 = _a.sent();
                        console.error(err_2);
                        res.status(500).send({ error: err_2.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PropertyController.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, name, address, newProperty, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = req.user.userId;
                        _a = req.body, name = _a.name, address = _a.address;
                        return [4 /*yield*/, property_model_1.PropertyModel.create({
                                name: name,
                                address: address,
                                userId: userId
                            })];
                    case 1:
                        newProperty = _b.sent();
                        return [2 /*return*/, res.status(201).send(newProperty)];
                    case 2:
                        err_3 = _b.sent();
                        console.error(err_3);
                        res.status(500).send({ error: err_3.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PropertyController.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var propertyId, _a, name, address, updatedProperty, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        propertyId = req.params.propertyId;
                        _a = req.body, name = _a.name, address = _a.address;
                        return [4 /*yield*/, property_model_1.PropertyModel.findByIdAndUpdate(propertyId, __assign(__assign({}, (name ? { name: name } : {})), (address ? { address: address } : {})))];
                    case 1:
                        updatedProperty = _b.sent();
                        res.status(200).send(updatedProperty);
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _b.sent();
                        console.error(err_4);
                        res.status(500).send({ error: err_4.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PropertyController["delete"] = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var propertyId, deleteResult, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        propertyId = req.params.propertyId;
                        return [4 /*yield*/, property_model_1.PropertyModel.deleteById(propertyId)];
                    case 1:
                        deleteResult = _a.sent();
                        if (!deleteResult) {
                            return [2 /*return*/, res.status(404).send("Property " + propertyId + " not found")];
                        }
                        return [2 /*return*/, res.status(204).send()];
                    case 2:
                        err_5 = _a.sent();
                        console.error(err_5);
                        res.status(500).send({ error: err_5.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return PropertyController;
}());
exports.PropertyController = PropertyController;
