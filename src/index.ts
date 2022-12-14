import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

import { app } from "./app";
import { AppDataSource } from "./data-source";
import { createWeeklyLeaderboardJob } from "./jobs/cron-weekly-leaderboard";
import { checkLeaderboard } from "./generators/check-leaderboard";
import { seeder } from "./generators/seeder";

const start = async () => {
  const PORT = process.env.PORT || 9090;

  try {
    const dataConnection = await AppDataSource.initialize();

    if (dataConnection) {
      console.log("Connected via TypeORM to MongoDB Database!");
      app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}!`));

      await checkLeaderboard();

      // seed the Database
      await seeder();

      // Cron job that creates weekly leaderboards for users
      return createWeeklyLeaderboardJob.start();
    }
  } catch (error) {
    console.error("Error!", error);
  }
};

start().catch((error) => console.error("Error! ", error));
