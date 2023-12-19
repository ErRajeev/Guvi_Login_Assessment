const express = require("express");
const router = express.Router();
const userLogInController = require("../controller/UserLoginController");
const userSignupController = require("../controller/UserSignupController");

router.post("/login", userLogInController.Login);
router.post("/reg", userSignupController.Signup);

module.exports = router;
