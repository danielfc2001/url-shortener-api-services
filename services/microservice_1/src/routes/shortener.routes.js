import { Router } from "express";
import { redirectToUrl } from "../controllers/shortener.controller.js";

const router = Router();

router.get("/:id", redirectToUrl);

export default router;
