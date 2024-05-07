const express = require("express");
const {
  login,
  signUp,
  refresh,
  logout,
  imageAuthenticator,
} = require("../controllers/authController");
const { forgetPass, resetPass } = require("../controllers/otpController");
const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);
router.post("/forget_password", forgetPass);
router.post("/reset_password", resetPass);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.post("/imageAuthenticator", imageAuthenticator);

module.exports = router;
