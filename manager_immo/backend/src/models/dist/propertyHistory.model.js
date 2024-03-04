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
exports.PropertyHistoryModel = void 0;
var db_1 = require("../../config/db");
var PropertyHistoryModel = /** @class */ (function () {
    function PropertyHistoryModel() {
    }
    PropertyHistoryModel.findById = function (propertyHistoryId) {
        return __awaiter(this, void 0, Promise, function () {
            var propertyHistory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1["default"]
                            .promise()
                            .query("SELECT * FROM propertyHistory WHERE id = ?", [propertyHistoryId])];
                    case 1:
                        propertyHistory = _a.sent();
                        return [2 /*return*/, propertyHistory[0][0]];
                }
            });
        });
    };
    PropertyHistoryModel.findAllByUserId = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            var propertyHistory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1["default"]
                            .promise()
                            .query("SELECT * FROM propertyHistory WHERE userId = ?", [userId])];
                    case 1:
                        propertyHistory = _a.sent();
                        return [2 /*return*/, propertyHistory[0]];
                }
            });
        });
    };
    PropertyHistoryModel.findAllByPropertyId = function (propertyId) {
        return __awaiter(this, void 0, Promise, function () {
            var propertyHistory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1["default"]
                            .promise()
                            .query("SELECT * FROM propertyHistory WHERE propertyId = ?", [propertyId])];
                    case 1:
                        propertyHistory = _a.sent();
                        return [2 /*return*/, propertyHistory[0]];
                }
            });
        });
    };
    PropertyHistoryModel.create = function (_a) {
        var _b;
        var name = _a.name, startAt = _a.startAt, endAt = _a.endAt, incomea = _a.incomea, propertyId = _a.propertyId, userId = _a.userId;
        return __awaiter(this, void 0, Promise, function () {
            var newPropertyHistory, newPropertyHistoryId;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, db_1["default"].promise().query("INSERT INTO propertyHistory (name, startAt, endAt, incomea, propertyId, userId)\n            VALUES (?, ?, ?, ?, ?, ?)", [name, startAt, endAt, incomea, propertyId, userId])];
                    case 1:
                        newPropertyHistory = _c.sent();
                        if (!("insertId" in (newPropertyHistory === null || newPropertyHistory === void 0 ? void 0 : newPropertyHistory[0]))) {
                            throw new Error("Un problème à était rencontré !");
                        }
                        newPropertyHistoryId = (_b = newPropertyHistory === null || newPropertyHistory === void 0 ? void 0 : newPropertyHistory[0]) === null || _b === void 0 ? void 0 : _b.insertId;
                        return [2 /*return*/, PropertyHistoryModel.findById(newPropertyHistoryId)];
                }
            });
        });
    };
    PropertyHistoryModel.findByIdAndUpdate = function (id, updateValues) {
        return __awaiter(this, void 0, void 0, function () {
            var updateResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1["default"].promise().query("UPDATE propertyHistory\n\t\t\t SET ?\n\t\t\t WHERE id = ?\n\t\t\t", [updateValues, id])];
                    case 1:
                        updateResult = (_a.sent())[0];
                        if (updateResult.affectedRows === 0) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, PropertyHistoryModel.findById(id)];
                }
            });
        });
    };
    PropertyHistoryModel.deleteById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1["default"].promise().query("DELETE FROM propertyHistory\n\t\t\t WHERE id = ?\n\t\t\t", [id])];
                    case 1:
                        deleteResult = (_a.sent())[0];
                        if (deleteResult.affectedRows === 0) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return PropertyHistoryModel;
}());
exports.PropertyHistoryModel = PropertyHistoryModel;
