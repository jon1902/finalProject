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
exports.PropertyModel = void 0;
const db_1 = __importDefault(require("../../config/db"));
class PropertyModel {
    static findById(propertyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const property = yield db_1.default
                .promise()
                .query(`SELECT * FROM properties WHERE id = ?`, [propertyId]);
            return property[0][0];
        });
    }
    static findAllByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const properties = yield db_1.default
                .promise()
                .query(`SELECT * FROM properties WHERE userId = ?`, [userId]);
            return properties[0];
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const properties = yield db_1.default
                .promise()
                .query(`SELECT * FROM properties`);
            return properties[0];
        });
    }
    static create({ name, address, userId, }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const newProperty = yield db_1.default.promise().query(`INSERT INTO properties (name, address, userId)
            VALUES (?, ?, ?)`, [name, address, userId]);
            if (!("insertId" in (newProperty === null || newProperty === void 0 ? void 0 : newProperty[0]))) {
                throw new Error("Un problème à était rencontré !");
            }
            const newPropertyId = (_a = newProperty === null || newProperty === void 0 ? void 0 : newProperty[0]) === null || _a === void 0 ? void 0 : _a.insertId;
            return PropertyModel.findById(newPropertyId);
        });
    }
    static findByIdAndUpdate(id, updateValues) {
        return __awaiter(this, void 0, void 0, function* () {
            const [updateResult] = yield db_1.default.promise().query(`UPDATE properties
			 SET ?
			 WHERE id = ?
			`, [updateValues, id]);
            if (updateResult.affectedRows === 0) {
                return null;
            }
            return PropertyModel.findById(id);
        });
    }
    static deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [deleteResult] = yield db_1.default.promise().query(`DELETE FROM properties
			 WHERE id = ?
			`, [id]);
            if (deleteResult.affectedRows === 0) {
                return false;
            }
            return true;
        });
    }
}
exports.PropertyModel = PropertyModel;
