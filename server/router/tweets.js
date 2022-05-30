import express from "express";
import "express-async-errors";
import * as controller from "../controller/index.js";
const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get("/", controller.getTweets);

// GET /tweets/:id
router.get("/:id", controller.getTweetsById);

// POST /tweeets
router.post("/", controller.postTweet);

// PUT /tweets/:id
router.put("/:id", controller.updateTweet);

// DELETE /tweets/:id
router.delete("/:id", controller.deleteTweet);

export default router;
