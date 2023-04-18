"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFeedback = exports.updateFeedback = exports.createFeedback = exports.getFeedbackById = exports.getAllClass = void 0;
var get_all_feedback_1 = require("./get-all-feedback");
Object.defineProperty(exports, "getAllClass", { enumerable: true, get: function () { return __importDefault(get_all_feedback_1).default; } });
var get_feedback_1 = require("./get-feedback");
Object.defineProperty(exports, "getFeedbackById", { enumerable: true, get: function () { return get_feedback_1.getFeedbackById; } });
var create_feedback_1 = require("./create-feedback");
Object.defineProperty(exports, "createFeedback", { enumerable: true, get: function () { return __importDefault(create_feedback_1).default; } });
var update_feedback_1 = require("./update-feedback");
Object.defineProperty(exports, "updateFeedback", { enumerable: true, get: function () { return update_feedback_1.updateFeedback; } });
var delete_feedback_1 = require("./delete-feedback");
Object.defineProperty(exports, "deleteFeedback", { enumerable: true, get: function () { return delete_feedback_1.deleteFeedback; } });
//# sourceMappingURL=index.js.map