const router = require("express").Router();

const { commentController } = require("../controllers");

router.post("/add", commentController.addComment);
router.post("/all", commentController.getAllComment);
router.put("/edit", commentController.updateComment);

module.exports = router;
