import { Request, Response } from "express";
import { PropertyModel } from "../models/property.model";
import { PropertyHistoryModel } from "../models/propertyHistory.model";

export class PropertyController {
	static async findById(req: any, res: Response) {
		try {
			const { propertyId } = req.params;

			const property = await PropertyModel.findById(propertyId);

			if (!property) {
				return res.status(404).send(`Property ${propertyId} not found`);
			}

			return res.status(200).send(property);
		} catch (err: any) {
			console.error(err);
			res.status(500).send({ error: err.message });
		}
	}
	
	static async findAll(req: any, res: Response) {
		try {
			const { userId } = req.user;

			const properties = await PropertyModel.findAllByUserId(userId);

			return res.status(200).send(properties);
		} catch (err: any) {
			console.error(err);
			res.status(500).send({ error: err.message });
		}
	}

	static async findAllWithIncomea(req: any, res: Response) {
		try {
			const { userId } = req.user;
			console.log(userId)
			const properties = await PropertyModel.findAllByUserId(userId);
			const propertyHistories = await PropertyHistoryModel.findAllByUserId(userId)

			const propertiesWithIncomea = properties.map((property: any) => {
				const propertyHistoryFiltered = propertyHistories.filter((history: any) => history.propertyId === property.id);
				const totalIncomea = propertyHistoryFiltered.reduce((acc: number, history: any) => acc + history.incomea, 0);
				return { ...property, totalIncomea };
			});	

			return res.status(200).send(propertiesWithIncomea);
		} catch (err: any) {
			console.error(err);
			res.status(500).send({ error: err.message });
		}
	}

	static async create(req: any, res: Response) {
		try {
			const { userId } = req.user;
			const { name, address } = req.body;

			const newProperty = await PropertyModel.create({
				name,
				address,
				userId,
			});

			return res.status(201).send(newProperty);
		} catch (err: any) {
			console.error(err);
			res.status(500).send({ error: err.message });
		}
	}

	static async update(req: any, res: Response) {
		try {
			const { propertyId } = req.params;
			const { name, address } = req.body;

			const updatedProperty = await PropertyModel.findByIdAndUpdate(
				propertyId,
				{
					...(name ? { name } : {}),
					...(address ? { address } : {}),
				}
			);

			res.status(200).send(updatedProperty);
		} catch (err: any) {
			console.error(err);
			res.status(500).send({ error: err.message });
		}
	}

	static async delete(req: any, res: Response) {
		try {
			const { propertyId } = req.params;

			const deleteResult = await PropertyModel.deleteById(propertyId);

			if (!deleteResult) {
				return res.status(404).send(`Property ${propertyId} not found`);
			}

			return res.status(204).send();
		} catch (err: any) {
			console.error(err);
			res.status(500).send({ error: err.message });
		}
	}
}
