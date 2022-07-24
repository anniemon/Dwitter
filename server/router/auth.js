import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as authController from "../controller/auth.js";
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";
const router = express.Router();

const validateCredentials = [
  body("username")
    .trim()
    .isLength({ min: 4 })
    .withMessage("username should be at least 4 characters"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("password should be at least 8 characters"),
  validate,
];

const validateSignup = [
  ...validateCredentials,
  //* validation에 bug가 있음...
  body("name").notEmpty().withMessage("name is missing"),
  body("email").isEmail().normalizeEmail().withMessage("invalid email"),
  body("url")
    .isURL()
    .withMessage("invalid URL")
    .optional({ nullable: true, checkFalsy: true }),
];

router.post("/signup", validateSignup, authController.signup);
router.post("/login", validateCredentials, authController.login);
router.get("/me", isAuth, authController.me);

export default router;
