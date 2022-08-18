import express from "express";
import {
  getUserChapterActivity,
  getUserChaptersActivity,
  getUserPerformanceData,
  getUserStoryActivity,
  getUserTodaysActivity,
  saveUserDanceActivity,
} from "../controllers/performance";

const router = express.Router();

router.get("/overall/:userId", getUserPerformanceData);
router.get("/today/:userId", getUserTodaysActivity);
router.get("/activity/story/:userId/:storyId", getUserStoryActivity);
router.get(
  "/activity/story/chapters/:userId/:storyId/:playedStoryId",
  getUserChaptersActivity
);
router.get(
  "/activity/story/chapter/:userId/:storyId/:chapterId",
  getUserChapterActivity
);
router.post(
  "/activity/story/chapters/:userId/:chapterId/:playedStoryId",
  saveUserDanceActivity
);
// router.post("/update/:userId", saveUserPerformance);

export { router as performanceRoutes };
