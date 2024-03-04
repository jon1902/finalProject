"use strict";
exports.__esModule = true;
var mysql2_1 = require("mysql2");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var db = mysql2_1["default"].createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
db.connect(function (err) {
    if (err) {
        console.error("Erreur de connexion à la base de données :", err);
    }
    else {
        console.log("Connecté à la base de données MySQL !");
    }
});
exports["default"] = db;
