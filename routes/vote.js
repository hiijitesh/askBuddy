const router = require("express").Router();

const { voteController } = require("../controllers");

router.post("/question/vote", voteController.questionVote);
// router.post("/question/downvote", voteController.questionDownVote);

router.post("/answer/vote", voteController.answerVote);
// router.post("/answer/downvote", voteController.answerDownVote);

module.exports = router;
