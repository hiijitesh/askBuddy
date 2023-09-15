const userController = require("../controllers/users/userController");

const router = require("express").Router();

router.post("/register", userController.signUp);
router.post("/login", userController.login);

module.exports = router;
