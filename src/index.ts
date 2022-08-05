import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
import { app } from "./app";
import { AppDataSource } from "./data-source";

const start = async () => {
  const PORT = process.env.PORT || 9090;

  try {
    const dataConnection = await AppDataSource.initialize();

    if (dataConnection) {
      console.log("Connected via TypeORM to MongoDB Database!");
      app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}!`));
    }
  } catch (error) {
    console.error("Error!", error);
  }
};

start().catch((error) => console.error("Error! ", error));
