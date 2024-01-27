const { userController } = require("../controllers");
const { isAuthenticated } = require("../utils/auth");

const router = require("express").Router();

router.post("/register", userController.signup);
router.post("/login", userController.login);

router.put("/update", isAuthenticated, userController.updateUserProfile);
router.post("/:userId", userController.getUserById);

module.exports = router;
