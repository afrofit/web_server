"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var validateCreateStripeSession = function (email) {
    var schema = joi_1.default.object({
        email: joi_1.default.string().required().email(),
        priceId: joi_1.default.string().required(),
    });
    return schema.validate(email);
};
exports.default = validateCreateStripeSession;
//# sourceMappingURL=create-stripe-session.js.map