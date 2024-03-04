"use strict";
exports.__esModule = true;
exports.AuthMiddleware = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var AuthMiddleware = /** @class */ (function () {
    function AuthMiddleware() {
    }
    AuthMiddleware.isConnected = function (req, res, next) {
        try {
            var token = req.cookies.token;
            if (!token) {
                return res.status(401).send({ error: "NO token !" });
            }
            var jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                throw res.status(500).send({ error: "jwt secret is not defined" });
            }
            req.user = jsonwebtoken_1["default"].verify(token, jwtSecret);
            next();
        }
        catch (err) {
            console.error(err);
            res.status(401).send({ error: err.message });
        }
    };
    return AuthMiddleware;
}());
exports.AuthMiddleware = AuthMiddleware;
