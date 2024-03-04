import { Request, Response } from "express";
import { PropertyHistoryModel } from "../models/propertyHistory.model";

export class PropertyHistoryController {
	static async findByPropertyId(req: any, res: Response) {
		try {
			const { propertyId } = req.params;

			const propertyHistory = await PropertyHistoryModel.findAllByPropertyId(propertyId);

			if (!propertyHistory) {
				return res.status(404).send(`Property history for this property ${propertyId} not found`);
			}

			return res.status(200).send(propertyHistory);
		} catch (err: any) {
			console.error(err);
			res.status(500).send({ error: err.message });
		}
	}

	static async findByUserId(req: any, res: Response) {
		try {
			const { userId } = req.user;

			const propertyHistory = await PropertyHistoryModel.findAllByUserId(userId);

			return res.status(200).send(propertyHistory);
		} catch (err: any) {
			console.error(err);
			res.status(500).send({ error: err.message });
		}
	}

	static async getTotalIncomea(req: any, res: Response) {
		try {
			const { userId } = req.user;

			const propertyHistory = await PropertyHistoryModel.findAllByUserId(userId);

			const totalIncomea = propertyHistory?.reduce((acc, currentValue) => {
				acc += currentValue.incomea;

				return acc;
			}, 0) || 0;

			return res.status(200).send({
				totalIncomea
			});
		} catch (err: any) {
			console.error(err);
			res.status(500).send({ error: err.message });
		}
	}

	static async create(req: any, res: Response) {
		try {
			const { userId } = req.user;
			const { name, startAt, endAt, incomea } = req.body;
            const { propertyId } = req.params;

			const newPropertyHistory = await PropertyHistoryModel.create({
				name,
                startAt: new Date(startAt),
                endAt: new Date(endAt),
                incomea,
                propertyId,
                userId,
			});

			return res.status(201).send(newPropertyHistory);
		} catch (err: any) {
			console.error(err);
			res.status(500).send({ error: err.message });
		}
	}

	static async update(req: any, res: Response) {
		try {
			const { propertyHistoryId } = req.params;
			const { name, startAt, endAt, incomea } = req.body;

            const newStartAt = new Date(startAt);
            const newEndAt = new Date(endAt);
            

			const updatedPropertyHistory = await PropertyHistoryModel.findByIdAndUpdate(
				propertyHistoryId,
				{
					...(name ? { name } : {}),
					...(startAt ? { startAt: newStartAt } : {}),
                    ...(endAt ? { endAt: newEndAt } : {}),
                    ...(incomea? {incomea} :{} ),
				}
			);

			res.status(200).send(updatedPropertyHistory);
		} catch (err: any) {
			console.error(err);
			res.status(500).send({ error: err.message });
		}
	}

	static async delete(req: any, res: Response) {
		try {
			const { propertyHistoryId } = req.params;

			const deleteResult = await PropertyHistoryModel.deleteById(propertyHistoryId);

			if (!deleteResult) {
				return res.status(404).send(`Property history ${propertyHistoryId} not found`);
			}

			return res.status(204).send();
		} catch (err: any) {
			console.error(err);
			res.status(500).send({ error: err.message });
		}
	}
}
