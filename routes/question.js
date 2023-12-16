const router = require("express").Router();

const { questionController } = require("../controllers");

router.post("/ask", questionController.addQuestion);
router.put("/edit", questionController.editQuestion);
router.delete("/remove", questionController.removeQuestion);
router.post("/getall", questionController.getUserQuestions);
router.post("/all", questionController.getallQuestions);

router.get("/:id", questionController.getQuestionById);

module.exports = router;
