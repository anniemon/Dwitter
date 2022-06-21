import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as tweetController from "../controller/tweet.js";
import { validate } from "../middleware/validator.js";
const router = express.Router();

const tweetValidator = [
  body("text")
    .trim()
    .isLength({ min: 3, max: 140 })
    .withMessage("text should be between 3 and 140 characters"),
  validate,
];
//TODO: req 필수 요소 검사

// GET /tweets
// GET /tweets?username=:username
router.get("/", tweetController.getTweets);

// GET /tweets/:id
router.get("/:id", tweetController.getTweetsById);

// POST /tweets
router.post("/", tweetValidator, tweetController.postTweet);

// PUT /tweets/:id
router.put("/:id", tweetValidator, tweetController.updateTweet);

// DELETE /tweets/:id
router.delete("/:id", tweetController.deleteTweet);

export default router;
