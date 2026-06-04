const express =
  require("express");

const router =
  express.Router();

const {
  userAuth,
} = require(
  "../middleware/authMiddleware"
);

const {

  saveUserSelection,

  getUserSelection,

} = require(

  "../controllers/appController"

);

// =====================================
// SAVE USER SELECTION
// =====================================

router.post(

  "/save-selection",

  userAuth,

  saveUserSelection

);

// =====================================
// GET USER SELECTION
// =====================================

router.get(

  "/my-selection",

  userAuth,

  getUserSelection

);

module.exports =
  router;