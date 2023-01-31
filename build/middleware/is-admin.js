"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var status_codes_1 = require("../types/status-codes");
var isAdmin = function (req, res, next) {
    var token = req.header(process.env.TOKEN_HEADER);
    if (!token)
        return res.status(status_codes_1.STATUS_CODES.UNAUTHORIZED).send("Provide a valid token.");
    try {
        var decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        if (decoded.role !== "admin")
            return res.status(status_codes_1.STATUS_CODES.UNAUTHORIZED).send("Invalid token.");
        req.currentUser = decoded;
        next();
    }
    catch (error) {
        res.status(status_codes_1.STATUS_CODES.BAD_REQUEST).send("Invalid token provided.");
    }
};
exports.default = isAdmin;
//# sourceMappingURL=is-admin.js.map