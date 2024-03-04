import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel, IUser } from "../models/user.model";

export class AuthController {
	static getToken(user: IUser) {
		const jwtSecret = process.env.JWT_SECRET;

		if (!jwtSecret) {
			throw new Error("jwt secret is not defined");
		}

		return jwt.sign(
			{ userId: user.id, username: user.username },
			jwtSecret,
			{
				expiresIn: '1d',
			}
		);

	}

	static setCookie(res: Response, user: IUser) {
		const token = AuthController.getToken(user);

		const maxAge = 1000 * 60 * 60 * 24;

		res.cookie("token", token, { maxAge });
	}

	static async login(req: Request, res: Response) {
		try {
			const { email, password } = req.body;

			const user = await UserModel.findOneWithEmail(email);

			if (!user) {
				return res
					.status(404)
					.send({ error: "Email or password are incorrect" });
			}

			const isCorrectPassword = bcrypt.compareSync(password, user.password);

			if (!isCorrectPassword) {
				return res
					.status(401)
					.send({ error: "Email or password are incorrect" });
			}

			AuthController.setCookie(res, user);

			const token = AuthController.getToken(user)

			res.status(200).send({
				id: user.id,
				username: user.username,
				email: user.email,
				token
			});
		} catch (err: any) {
			console.error(err);
			res.status(500).send({ error: err.message });
		}
	}

	static async register(req: Request, res: Response) {
		try {
			const { username, email, password } = req.body;

			const salt = bcrypt.genSaltSync(10);
			const hashPassword = bcrypt.hashSync(password, salt);

			const user = await UserModel.create({
				username,
				email,
				password: hashPassword,
			});

			AuthController.setCookie(res, user);
			
			const token = AuthController.getToken(user)


			return res.status(201).send({ user, token });
		} catch (err: any) {
			console.error(err);
			res.status(500).send({ error: err.message });
		}
	}
}
