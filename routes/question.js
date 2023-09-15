const router = require("express").Router();

const { questionController } = require("../controllers");

router.post("/ask", questionController.addQuestion);
router.post("/edit", questionController.editQuestion);

module.exports = router;
