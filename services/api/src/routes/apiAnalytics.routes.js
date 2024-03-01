import { Router } from "express";
import { getUrlShortenedAnalytics } from "../controllers/apiAnalytics.controller.js";

const router = Router();

router.get("/:id", getUrlShortenedAnalytics);

export default router;
