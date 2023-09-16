const router = require("express").Router();

const { answerController } = require("../controllers");

router.post("/ans", answerController.addAnswer);
router.put("/edit", answerController.editAnswer);
router.delete("/remove", answerController.removeAnswer);
router.get("/all", answerController.AllAnswer);

// TODO accept ans
router.get("/:id", answerController.getAnswer);

module.exports = router;
