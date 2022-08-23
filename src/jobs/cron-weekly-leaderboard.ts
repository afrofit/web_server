import { CronJob } from "cron";
import { createWeeklyLeaderboard } from "../controllers/functions/create-weekly-leaderboard";

const createWeeklyLeaderboardJob = new CronJob("1 * * * * *", () =>
  createWeeklyLeaderboard()
);

export { createWeeklyLeaderboardJob };
