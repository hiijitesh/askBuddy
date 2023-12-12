const router = require("express").Router();

const { voteController } = require("../controllers");

router.post("/question/vote", voteController.questionVote);
router.post("/answer/vote", voteController.answerVote);

module.exports = router;
