import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as authController from "../controller/auth.js";
import { validate } from "../middleware/validator.js";
const router = express.Router();

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.get("/me", authController.me);

export default router;
