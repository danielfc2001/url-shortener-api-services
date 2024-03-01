import { Router } from "express";
import {
  createShortenedUrl,
  deleteShortenedUrl,
  getAllShortenedsUrl,
  searchShortenedsUrls,
  updateShortenedUrl,
} from "../controllers/apiShortener.controller.js";
import { checkingUser } from "../middlewares/checkingUser.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const router = Router();

router.get("/search", checkingUser, searchShortenedsUrls);

router.get("/get", checkingUser, getAllShortenedsUrl);

router.post("/create", verifyUser, createShortenedUrl);

router.put("/:id", checkingUser, updateShortenedUrl);

router.delete("/:id", checkingUser, deleteShortenedUrl);

export default router;
