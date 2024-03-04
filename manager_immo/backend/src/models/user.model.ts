import db from "../../config/db";

interface ICreateUser {
	username: string;
	email: string;
	password: string;
}

export interface IUser {
	id: number;
	username: string;
	email: string;
	password: string;
}

export class UserModel {
	static async findOneWithEmail(email: string): Promise<IUser> {
        const user: any = await db.promise().query(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        )

        return user[0][0] as IUser;
	}

	static async create({ username, email, password }: ICreateUser) {
			await db.promise().query(
				`INSERT INTO users (username, email, password)
                VALUES (?, ?, ?)`,
				[username, email, password]
			);

			return UserModel.findOneWithEmail(email);
	}
}
