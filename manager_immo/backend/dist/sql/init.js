"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const initUsers = `
CREATE TABLE IF NOT EXISTS users
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
`;
const initProperties = `
CREATE TABLE IF NOT EXISTS properties
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name CHAR(255) NOT NULL,
    address VARCHAR(100) NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);
`;
const initPropertyHistories = `
CREATE TABLE IF NOT EXISTS propertyHistory
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    startAt DATETIME NOT NULL,
    endAt DATETIME NOT NULL,
    incomea INT NOT NULL,
    propertyId INT NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (propertyId) REFERENCES properties(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);
`;
db_1.default.query(initUsers, (err, results) => {
    if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err);
        return;
    }
    console.log('Résultats de users :', results);
});
db_1.default.query(initProperties, (err, results) => {
    if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err);
        return;
    }
    console.log('Résultats de properties :', results);
});
db_1.default.query(initPropertyHistories, (err, results) => {
    if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err);
        return;
    }
    console.log('Résultats de propertyHistory :', results);
});
