"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackRoutes = void 0;
var express_1 = __importDefault(require("express"));
var feedback_1 = require("../controllers/feedback");
var middleware_1 = require("../middleware");
var router = express_1.default.Router();
exports.feedbackRoutes = router;
router.get("/", feedback_1.getFeedback);
router.post("/create", middleware_1.fileUpload.single("image"), feedback_1.createFeedback);
//# sourceMappingURL=feedback.js.map