import express from "express";
import { getMarathonData } from "../controllers/marathon";

const router = express.Router();

router.get("/:userId", getMarathonData);

export { router as marathonRoutes };
