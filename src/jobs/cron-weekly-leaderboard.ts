import { CronJob } from "cron";
import { createWeeklyLeaderboard } from "../controllers/functions/create-weekly-leaderboard";

const createWeeklyLeaderboardJob = new CronJob(
  "0 0 * * Sun",
  async () => await createWeeklyLeaderboard()
);

export { createWeeklyLeaderboardJob };
