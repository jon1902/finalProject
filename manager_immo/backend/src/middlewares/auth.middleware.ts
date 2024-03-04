import jwt from "jsonwebtoken";

export class AuthMiddleware {
	static isConnected(req: any, res: any, next: any) {
		try {
			const headerToken = req.headers.authorization?.split(' ')[1];
			const { token } = req.cookies;
			
			if (!token && !headerToken) {
				return res.status(401).send({ error: "NO token !" });
			}

			const jwtSecret = process.env.JWT_SECRET;

			if (!jwtSecret) {
				throw res.status(500).send({ error: "jwt secret is not defined" });
			}

			req.user = jwt.verify(headerToken || token, jwtSecret);

			next();
		} catch (err: any) {
			console.error(err);
			res.status(401).send({ error: err.message });
		}
	}
}
