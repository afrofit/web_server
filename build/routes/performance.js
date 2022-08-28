"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.performanceRoutes = void 0;
var express_1 = __importDefault(require("express"));
var performance_1 = require("../controllers/performance");
var router = express_1.default.Router();
exports.performanceRoutes = router;
router.get("/overall/:userId", performance_1.getUserPerformanceData);
router.get("/today/:userId", performance_1.getUserTodaysActivity);
router.get("/activity/story/:userId/:storyId", performance_1.getUserStoryActivity);
router.get("/activity/story/chapters/:userId/:storyId/:playedStoryId", performance_1.getUserChaptersActivity);
router.get("/activity/story/chapter/:userId/:storyId/:chapterId", performance_1.getUserChapterActivity);
router.post("/activity/story/chapters/:userId/:chapterId/:playedStoryId", performance_1.saveUserDanceActivity);
//# sourceMappingURL=performance.js.map