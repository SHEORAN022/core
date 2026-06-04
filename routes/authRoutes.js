
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