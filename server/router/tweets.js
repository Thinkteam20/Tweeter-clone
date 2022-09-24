import express from "express";
import "express-async-errors";
import * as tweetController from "../controller/tweet.js";
import { body, param, validationResult } from "express-validator";
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

// validation
// sanitization
// Contract Testing: Client-Server

const validateTweet = [
    body("text") //
        .trim()
        .isLength({ min: 3 })
        .withMessage("text is too short"),
    validate,
];
// Get Tweets
// get Tweets by username

router.get("/", isAuth, tweetController.getTweets);

// get Tweet by id

router.get("/:id", isAuth, tweetController.getTweet);
// POST /tweeets
router.post("/", isAuth, validateTweet, tweetController.createTweet);

// PUT /tweets/:id
router.put("/:id", isAuth, validateTweet, tweetController.updateTweet);

// Delete Tweets

router.delete("/:id", isAuth, tweetController.deleteTweet);

export default router;
