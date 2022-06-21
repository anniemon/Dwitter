import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as authController from "../controller/auth.js";
import { validate } from "../middleware/validator.js";
const router = express.Router();

const usernameValidator = [
  body("username")
    .trim()
    .isLength({ min: 4 })
    .withMessage("username should be at least 4 characters"),
  validate,
];

const passwordValidator = [
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("password should be at least 8 characters"),
  validate,
];

router.post(
  "/signup",
  usernameValidator,
  passwordValidator,
  authController.signup
);

//TODO: req 필수 요소 검사

router.post("/login", usernameValidator, authController.login);

router.get("/me", authController.me);

export default router;
