import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.DB_USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
});

db.connect((err) => {
	if (err) {
		console.error("Erreur de connexion à la base de données :", err);
	} else {
		console.log("Connecté à la base de données MySQL !");
	}
});

export default db;
