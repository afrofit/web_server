"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var validateSetNewPassword = function (userData) {
    var schema = joi_1.default.object({
        password: joi_1.default.string().required().min(6),
        hash: joi_1.default.string().required().min(6),
    });
    return schema.validate(userData);
};
exports.default = validateSetNewPassword;
//# sourceMappingURL=set-new-password.js.map