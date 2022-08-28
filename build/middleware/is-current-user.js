"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var status_codes_1 = require("../types/status-codes");
var isCurrentUser = function (req, res, next) {
    if (!req.currentUser)
        return res.status(status_codes_1.STATUS_CODES.FORBIDDEN).send("Access forbidden.");
    next();
};
exports.default = isCurrentUser;
//# sourceMappingURL=is-current-user.js.map