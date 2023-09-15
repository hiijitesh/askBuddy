const userController = require("../controllers/users/userController");

const router = require("express").Router();

router.post("/register", userController.signUp);

module.exports = router;
