import db from "../../config/db";

export interface IProperty {
	id: number;
	name: string;
	address: string;
	userId: number;
}

interface ICreateProperty {
	name: string;
	address: string;
	userId: number;
}

interface IUpdateProperty {
	name?: string;
	address?: string;
}

export class PropertyModel {
	static async findById(propertyId: number | string): Promise<IProperty> {
		const property: any = await db
			.promise()
			.query(`SELECT * FROM properties WHERE id = ?`, [propertyId]);

		return property[0][0] as IProperty;
	}

	static async findAllByUserId(userId: number): Promise<IProperty[]> {
		const properties: any = await db
			.promise()
			.query(`SELECT * FROM properties WHERE userId = ?`, [userId]);

		return properties[0] as IProperty[];
	}

	static async findAll(): Promise<IProperty[]> {
		const properties: any = await db
			.promise()
			.query(`SELECT * FROM properties`);

		return properties[0] as IProperty[];
	}

	static async create({
		name,
		address,
		userId,
	}: ICreateProperty): Promise<IProperty> {
		const newProperty = await db.promise().query(
			`INSERT INTO properties (name, address, userId)
            VALUES (?, ?, ?)`,
			[name, address, userId]
		);

		if (!("insertId" in newProperty?.[0])) {
			throw new Error("Un problème à était rencontré !");
		}

		const newPropertyId = newProperty?.[0]?.insertId;

		return PropertyModel.findById(newPropertyId);
	}

	static async findByIdAndUpdate(id: number | string, updateValues: IUpdateProperty){
		const [updateResult]: any =  await db.promise().query(
			`UPDATE properties
			 SET ?
			 WHERE id = ?
			`,
			[updateValues, id]
		)

		if(updateResult.affectedRows === 0){
			return null;
		}

		return PropertyModel.findById(id);
	}

	static async deleteById(id: number | string){
		const [deleteResult]: any =  await db.promise().query(
			`DELETE FROM properties
			 WHERE id = ?
			`,
			[id]
		)

		if(deleteResult.affectedRows === 0){
			return false;
		}

		return true
	}
}
