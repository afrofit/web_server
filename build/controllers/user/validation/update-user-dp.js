"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var validateUpdateUserDp = function (displayPicId) {
    var schema = joi_1.default.object({
        displayPicId: joi_1.default.number().min(1).max(16),
    });
    return schema.validate(displayPicId);
};
exports.default = validateUpdateUserDp;
//# sourceMappingURL=update-user-dp.js.map