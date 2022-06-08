"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule)
        return mod;
    var result = {};
    if (mod != null)
        for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var express_validator_1 = require("express-validator");
var tweetController = __importStar(require("../controller/tweet.js"));
var validator_js_1 = require("../middleware/validator.js");
var router = express_1.default.Router();
var tweetValidator = [
    (0, express_validator_1.body)("text")
        .trim()
        .isLength({ min: 3, max: 140 })
        .withMessage("text should be between 3 and 140 characters"),
    validator_js_1.validate,
];
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
exports.default = router;
//# sourceMappingURL=tweets.js.map