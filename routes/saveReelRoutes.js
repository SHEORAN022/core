
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

  saveReel,

  getSavedReels,

  removeSavedReel,

} = require(

  "../controllers/saveReelController"

);

// =====================================
// SAVE REEL
// =====================================

router.post(

  "/save",

  userAuth,

  saveReel

);

// =====================================
// GET SAVED REELS
// =====================================

router.get(

  "/",

  userAuth,

  getSavedReels

);

// =====================================
// REMOVE SAVED REEL
// =====================================

router.delete(

  "/:reelId",

  userAuth,

  removeSavedReel

);

module.exports =
  router;

