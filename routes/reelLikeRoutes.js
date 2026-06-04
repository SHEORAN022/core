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

  toggleLike,

  getLikedReels,

} = require(
  "../controllers/reelLikeController"
);

// =====================
// TOGGLE LIKE
// =====================

router.post(

  "/toggle",

  userAuth,

  toggleLike

);

// =====================
// GET LIKED REELS
// =====================

router.get(

  "/",

  userAuth,

  getLikedReels

);

module.exports =
  router;