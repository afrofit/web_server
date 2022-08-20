import express from "express";
import { getMarathonData } from "../controllers/marathon";

const router = express.Router();

router.post("/", getMarathonData);

export { router as marathonRoutes };
