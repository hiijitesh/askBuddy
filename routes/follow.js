const router = require("express").Router();

const { followController } = require("../controllers");

router.post("/follow", followController.followOrUnfollow);

module.exports = router;
