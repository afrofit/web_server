"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateFeedback = void 0;
var joi_1 = __importDefault(require("joi"));
var validateCreateFeedback = function (data) {
    var schema = joi_1.default.object({
        description: joi_1.default.string().required(),
        title: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
    });
    return schema.validate(data);
};
exports.validateCreateFeedback = validateCreateFeedback;
//# sourceMappingURL=validate-create-feedback.js.map