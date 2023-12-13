const router = require("express").Router();

const { questionController } = require("../controllers");

router.post("/ask", questionController.addQuestion);
router.put("/edit", questionController.editQuestion);
router.delete("/remove", questionController.removeQuestion);
router.post("/getall", questionController.allQuestions);

router.get("/:id", questionController.getQuestion);

module.exports = router;
