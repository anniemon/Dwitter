import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as controller from "../controller/index.js";
import { validate } from "../middleware/validator.js";
const router = express.Router();

const tweetValidator = [
  body("text")
    .trim()
    .isLength({ min: 3, max: 140 })
    .withMessage("text should be between 3 and 140 characters"),
  validate,
];

// GET /tweets
// GET /tweets?username=:username
router.get("/", controller.getTweets);

// GET /tweets/:id
router.get("/:id", controller.getTweetsById);

// POST /tweets
router.post("/", tweetValidator, controller.postTweet);

// PUT /tweets/:id
router.put("/:id", tweetValidator, controller.updateTweet);

// DELETE /tweets/:id
router.delete("/:id", controller.deleteTweet);

export default router;
