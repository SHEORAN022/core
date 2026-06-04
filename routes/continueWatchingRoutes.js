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

  saveWatchProgress,

  getContinueWatching,

} = require(
  "../controllers/continueWatchingController"
);

// =====================
// SAVE PROGRESS
// =====================

router.post(

  "/save",

  userAuth,

  saveWatchProgress

);

// =====================
// GET CONTINUE WATCHING
// =====================

router.get(

  "/",

  userAuth,

  getContinueWatching

);

module.exports =
  router;