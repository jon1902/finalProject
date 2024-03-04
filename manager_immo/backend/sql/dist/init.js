"use strict";
exports.__esModule = true;
var db_1 = require("../config/db");
var initUsers = "\nCREATE TABLE IF NOT EXISTS users\n(\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    username VARCHAR(255) NOT NULL,\n    email VARCHAR(255) NOT NULL,\n    password VARCHAR(255) NOT NULL\n);\n";
var initProperties = "\nCREATE TABLE IF NOT EXISTS properties\n(\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    name CHAR(255) NOT NULL,\n    address VARCHAR(100) NOT NULL,\n    userId INT NOT NULL,\n    FOREIGN KEY (userId) REFERENCES users(id)\n);\n";
var initPropertyHistories = "\nCREATE TABLE IF NOT EXISTS propertyHistory\n(\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    name VARCHAR(255) NOT NULL,\n    startAt DATETIME NOT NULL,\n    endAt DATETIME NOT NULL,\n    incomea INT NOT NULL,\n    propertyId INT NOT NULL,\n    userId INT NOT NULL,\n    FOREIGN KEY (propertyId) REFERENCES properties(id),\n    FOREIGN KEY (userId) REFERENCES users(id)\n);\n";
db_1["default"].query(initUsers, function (err, results) {
    if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err);
        return;
    }
    console.log('Résultats de users :', results);
});
db_1["default"].query(initProperties, function (err, results) {
    if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err);
        return;
    }
    console.log('Résultats de properties :', results);
});
db_1["default"].query(initPropertyHistories, function (err, results) {
    if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err);
        return;
    }
    console.log('Résultats de propertyHistory :', results);
});
