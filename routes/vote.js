const router = require("express").Router();

const { voteController } = require("../controllers");

router.post("/question/upvote", voteController.questionUpvote);
router.post("/question/downvote", voteController.questionDownVote);

router.post("/answer/upvote", voteController.ansUpVote);
router.post("/answer/downvote", voteController.answerDownVote);

module.exports = router;
