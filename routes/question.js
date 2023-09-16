const router = require("express").Router();

const { questionController } = require("../controllers");

router.post("/ask", questionController.addQuestion);
router.put("/edit", questionController.editQuestion);
router.delete("/remove", questionController.removeQuestion);
//todo is Answered
router.get("/:id", questionController.getQuestion);

module.exports = router;
