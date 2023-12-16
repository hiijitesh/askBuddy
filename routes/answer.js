const router = require("express").Router();

const { answerController } = require("../controllers");

router.post("/ans", answerController.addAnswer);
router.put("/edit", answerController.updateAnswer);
router.delete("/remove", answerController.deleteAnswer);
router.get("/all", answerController.getAllAnswer);
router.post("/accept", answerController.markAnswerAccepted);

router.get("/:id", answerController.getAnswerById);

module.exports = router;
