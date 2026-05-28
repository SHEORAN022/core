// const express = require("express");
// const router = express.Router();

// const {
//   googleLogin,
// } = require("../controllers/authController");

// router.post("/google-login", googleLogin);

// module.exports = router;

const express =
  require("express");

const router =
  express.Router();

const {

  googleLogin,

  getAllUsers,

} = require(

  "../controllers/authController"

);

// ==========================
// GOOGLE LOGIN
// ==========================

router.post(

  "/google-login",

  googleLogin

);

// ==========================
// GET USERS
// ==========================

router.get(

  "/users",

  getAllUsers

);

module.exports =
  router;