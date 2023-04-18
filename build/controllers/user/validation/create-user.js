"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var validateCreateUser = function (userData) {
    var schema = joi_1.default.object({
        email: joi_1.default.string().required().email(),
        password: joi_1.default.string().required().min(6).max(255),
        username: joi_1.default.string().min(3).max(25),
        firstName: joi_1.default.string().required().min(2).max(255),
        lastName: joi_1.default.string().required().min(2).max(255),
        displayPicId: joi_1.default.number().min(1).max(16),
        role: joi_1.default.string().optional(),
    });
    return schema.validate(userData);
};
exports.default = validateCreateUser;
//# sourceMappingURL=create-user.js.map