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
exports.PropertyHistoryModel = void 0;
const db_1 = __importDefault(require("../../config/db"));
class PropertyHistoryModel {
    static findById(propertyHistoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const propertyHistory = yield db_1.default
                .promise()
                .query(`SELECT * FROM propertyHistory WHERE id = ?`, [propertyHistoryId]);
            return propertyHistory[0][0];
        });
    }
    static findAllByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const propertyHistory = yield db_1.default
                .promise()
                .query(`SELECT * FROM propertyHistory WHERE userId = ?`, [userId]);
            return propertyHistory[0];
        });
    }
    static findAllByPropertyId(propertyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const propertyHistory = yield db_1.default
                .promise()
                .query(`SELECT * FROM propertyHistory WHERE propertyId = ?`, [propertyId]);
            return propertyHistory[0];
        });
    }
    static create({ name, startAt, endAt, incomea, propertyId, userId, }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const newPropertyHistory = yield db_1.default.promise().query(`INSERT INTO propertyHistory (name, startAt, endAt, incomea, propertyId, userId)
            VALUES (?, ?, ?, ?, ?, ?)`, [name, startAt, endAt, incomea, propertyId, userId]);
            if (!("insertId" in (newPropertyHistory === null || newPropertyHistory === void 0 ? void 0 : newPropertyHistory[0]))) {
                throw new Error("Un problème à était rencontré !");
            }
            const newPropertyHistoryId = (_a = newPropertyHistory === null || newPropertyHistory === void 0 ? void 0 : newPropertyHistory[0]) === null || _a === void 0 ? void 0 : _a.insertId;
            return PropertyHistoryModel.findById(newPropertyHistoryId);
        });
    }
    static findByIdAndUpdate(id, updateValues) {
        return __awaiter(this, void 0, void 0, function* () {
            const [updateResult] = yield db_1.default.promise().query(`UPDATE propertyHistory
			 SET ?
			 WHERE id = ?
			`, [updateValues, id]);
            if (updateResult.affectedRows === 0) {
                return null;
            }
            return PropertyHistoryModel.findById(id);
        });
    }
    static deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [deleteResult] = yield db_1.default.promise().query(`DELETE FROM propertyHistory
			 WHERE id = ?
			`, [id]);
            if (deleteResult.affectedRows === 0) {
                return false;
            }
            return true;
        });
    }
}
exports.PropertyHistoryModel = PropertyHistoryModel;
