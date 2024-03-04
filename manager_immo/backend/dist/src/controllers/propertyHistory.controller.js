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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyHistoryController = void 0;
const propertyHistory_model_1 = require("../models/propertyHistory.model");
class PropertyHistoryController {
    static findByPropertyId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { propertyId } = req.params;
                const propertyHistory = yield propertyHistory_model_1.PropertyHistoryModel.findAllByPropertyId(propertyId);
                if (!propertyHistory) {
                    return res.status(404).send(`Property history for this property ${propertyId} not found`);
                }
                return res.status(200).send(propertyHistory);
            }
            catch (err) {
                console.error(err);
                res.status(500).send({ error: err.message });
            }
        });
    }
    static findByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.user;
                const propertyHistory = yield propertyHistory_model_1.PropertyHistoryModel.findAllByUserId(userId);
                return res.status(200).send(propertyHistory);
            }
            catch (err) {
                console.error(err);
                res.status(500).send({ error: err.message });
            }
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.user;
                const { name, startAt, endAt, incomea } = req.body;
                const { propertyId } = req.params;
                const newPropertyHistory = yield propertyHistory_model_1.PropertyHistoryModel.create({
                    name,
                    startAt: new Date(startAt),
                    endAt: new Date(endAt),
                    incomea,
                    propertyId,
                    userId,
                });
                return res.status(201).send(newPropertyHistory);
            }
            catch (err) {
                console.error(err);
                res.status(500).send({ error: err.message });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { propertyHistoryId } = req.params;
                const { name, startAt, endAt, incomea } = req.body;
                const newStartAt = new Date(startAt);
                const newEndAt = new Date(endAt);
                const updatedPropertyHistory = yield propertyHistory_model_1.PropertyHistoryModel.findByIdAndUpdate(propertyHistoryId, Object.assign(Object.assign(Object.assign(Object.assign({}, (name ? { name } : {})), (startAt ? { startAt: newStartAt } : {})), (endAt ? { endAt: newEndAt } : {})), (incomea ? { incomea } : {})));
                res.status(200).send(updatedPropertyHistory);
            }
            catch (err) {
                console.error(err);
                res.status(500).send({ error: err.message });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { propertyHistoryId } = req.params;
                const deleteResult = yield propertyHistory_model_1.PropertyHistoryModel.deleteById(propertyHistoryId);
                if (!deleteResult) {
                    return res.status(404).send(`Property history ${propertyHistoryId} not found`);
                }
                return res.status(204).send();
            }
            catch (err) {
                console.error(err);
                res.status(500).send({ error: err.message });
            }
        });
    }
}
exports.PropertyHistoryController = PropertyHistoryController;
