const router = require("express").Router();

const { voteController } = require("../controllers");

router.post("/question/upvote", voteController.questionUpvote);
router.post("/question/downvote", voteController.questionDownVote);

module.exports = router;
