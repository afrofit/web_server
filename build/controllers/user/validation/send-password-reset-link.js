"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var validateResetLink = function (userData) {
    var schema = joi_1.default.object({
        email: joi_1.default.string().required().email(),
    });
    return schema.validate(userData);
};
exports.default = validateResetLink;
//# sourceMappingURL=send-password-reset-link.js.map