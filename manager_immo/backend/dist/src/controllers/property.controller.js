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
exports.PropertyController = void 0;
const property_model_1 = require("../models/property.model");
class PropertyController {
    static findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { propertyId } = req.params;
                const property = yield property_model_1.PropertyModel.findById(propertyId);
                if (!property) {
                    return res.status(404).send(`Property ${propertyId} not found`);
                }
                return res.status(200).send(property);
            }
            catch (err) {
                console.error(err);
                res.status(500).send({ error: err.message });
            }
        });
    }
    static findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.user;
                const properties = yield property_model_1.PropertyModel.findAllByUserId(userId);
                return res.status(200).send(properties);
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
                const { name, address } = req.body;
                const newProperty = yield property_model_1.PropertyModel.create({
                    name,
                    address,
                    userId,
                });
                return res.status(201).send(newProperty);
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
                const { propertyId } = req.params;
                const { name, address } = req.body;
                const updatedProperty = yield property_model_1.PropertyModel.findByIdAndUpdate(propertyId, Object.assign(Object.assign({}, (name ? { name } : {})), (address ? { address } : {})));
                res.status(200).send(updatedProperty);
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
                const { propertyId } = req.params;
                const deleteResult = yield property_model_1.PropertyModel.deleteById(propertyId);
                if (!deleteResult) {
                    return res.status(404).send(`Property ${propertyId} not found`);
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
exports.PropertyController = PropertyController;
