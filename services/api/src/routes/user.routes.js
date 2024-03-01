import { Router } from "express";
import {
  createUser,
  getUser,
  loginUser,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/:token", getUser);

router.post("/create", createUser);

router.post("/login", loginUser);

export default router;
