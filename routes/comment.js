const router = require("express").Router();

const { commentController } = require("../controllers");

router.post("/add", commentController.addComment);
router.post("/all", commentController.getAllComment);
router.put("/edit", commentController.updateComment);

// router.delete("/remove", commentController.removeAnswer);
// router.post("/accept", commentController.markAnswerAccepted);
// router.get("/:id", commentController.getAnswer);

module.exports = router;
