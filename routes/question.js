const router = require("express").Router();

const { questionController } = require("../controllers");

router.post("/ask", questionController.askQuestion);
router.put("/edit", questionController.updateQuestion);
router.delete("/remove", questionController.deleteQuestion);
router.post("/getall", questionController.getUserQuestions);
router.post("/all", questionController.getallQuestions);

router.get("/:id", questionController.getQuestionById);

module.exports = router;
