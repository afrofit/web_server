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
/**
 * Testimonials  APIs
 * */
router.get("/", feedback_1.getAllClass);
router.get("/:feedbackId", middleware_1.isAuthenticated, feedback_1.getFeedbackById);
router.post("/create", middleware_1.isAdmin, middleware_1.fileUpload.single("image"), feedback_1.createFeedback);
router.put("/:feedbackId", middleware_1.isAdmin, middleware_1.fileUpload.single("image"), feedback_1.updateFeedback);
router.delete("/:feedbackId", middleware_1.isAdmin, feedback_1.deleteFeedback);
//# sourceMappingURL=feedback.js.map