import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import appRouter from "./src/routes";

import "./config/db";

dotenv.config();

const PORT = 5050;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: ["http://localhost:5173", "http://10.0.0.25:8081"],
		credentials: true,
	})
);

app.use(appRouter);

app.listen(PORT, () => {
	console.log(`server listen on port ${PORT} => http://localhost:${PORT}`);
});
