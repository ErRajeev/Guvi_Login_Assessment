const express = require("express");
const router = express.Router();
const userLogInController = require("../controller/UserLoginController");
const userSignupController = require("../controller/UserSignupController");
const userProfileController = require("../controller/UserProfileController");

router.post("/login", userLogInController.Login);
router.post("/reg", userSignupController.Signup);
router.post("/otp-verify", userSignupController.otpVerification);
router.get("/profile/:id", userProfileController.getUserById);
router.patch("/profile/:id", userProfileController.updateUser);

module.exports = router;
