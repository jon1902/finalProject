import db from "../../config/db";

export interface IPropertyHistory {
	id: number;
	name: string;
    startAt: Date;
    endAt: Date;
    incomea: number;
	propertyId: number;
    userId: number;
}

interface ICreatePropertyHisrtory {
	name: string;
    startAt: Date;
    endAt: Date;
    incomea: number;
	propertyId: number;
    userId: number;
}

interface IUpdatePropertyHistory {
	name?: string;
    startAt?: Date;
    endAt?: Date;
    incomea?: number;
}

export class PropertyHistoryModel {
    static async findById(propertyHistoryId: number | string): Promise<IPropertyHistory> {
		const propertyHistory: any = await db
			.promise()
			.query(`SELECT * FROM propertyHistory WHERE id = ?`, [propertyHistoryId]);

		return propertyHistory[0][0] as IPropertyHistory;
	}

	static async findAllByUserId(userId: number): Promise<IPropertyHistory[]> {
		const propertyHistory: any = await db
			.promise()
			.query(`SELECT * FROM propertyHistory WHERE userId = ?`, [userId]);

		return propertyHistory[0] as IPropertyHistory[];
	}

    static async findAllByPropertyId(propertyId: number): Promise<IPropertyHistory[]> {
		const propertyHistory: any = await db
			.promise()
			.query(`SELECT * FROM propertyHistory WHERE propertyId = ?`, [propertyId]);

		return propertyHistory[0] as IPropertyHistory[];
	}

	static async create({
		name,
        startAt,
        endAt,
        incomea,
        propertyId,
		userId,
	}: ICreatePropertyHisrtory): Promise<IPropertyHistory> {
		const newPropertyHistory = await db.promise().query(
			`INSERT INTO propertyHistory (name, startAt, endAt, incomea, propertyId, userId)
            VALUES (?, ?, ?, ?, ?, ?)`,
			[name,startAt,endAt,incomea,propertyId,userId]
		);

		if (!("insertId" in newPropertyHistory?.[0])) {
			throw new Error("Un problème à était rencontré !");
		}

		const newPropertyHistoryId = newPropertyHistory?.[0]?.insertId;

		return PropertyHistoryModel.findById(newPropertyHistoryId);
	}

	static async findByIdAndUpdate(id: number | string, updateValues: IUpdatePropertyHistory){
		const [updateResult]: any =  await db.promise().query(
			`UPDATE propertyHistory
			 SET ?
			 WHERE id = ?
			`,
			[updateValues, id]
		)

		if(updateResult.affectedRows === 0){
			return null;
		}

		return PropertyHistoryModel.findById(id);
	}

	static async deleteById(id: number | string){
		const [deleteResult]: any =  await db.promise().query(
			`DELETE FROM propertyHistory
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
