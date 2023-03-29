"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var validateLoginUser = function (userData) {
    var schema = joi_1.default.object({
        email: joi_1.default.string().required().email(),
        password: joi_1.default.string().required().min(6).max(255),
        pushSubscription: joi_1.default.object().optional(),
        FCMToken: joi_1.default.string().optional(),
        isDevice: joi_1.default.boolean().optional(),
    });
    return schema.validate(userData);
};
exports.default = validateLoginUser;
//# sourceMappingURL=login-user.js.map