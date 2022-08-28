"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var validateRetrieveStripeSession = function (sessionId) {
    var schema = joi_1.default.object({
        sessionId: joi_1.default.string().required(),
    });
    return schema.validate(sessionId);
};
exports.default = validateRetrieveStripeSession;
//# sourceMappingURL=retrieve-stripe-session.js.map