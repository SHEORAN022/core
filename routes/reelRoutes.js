const express =
  require("express");

const router =
  express.Router();

const {

  createReel,

  getReels,

  getSingleReel,

  updateReel,

  deleteReel,
  getTeacherReels,

} = require(

  "../controllers/reelController"

);

// ============================
// CREATE REEL
// ============================

router.post(
  "/create",
  createReel
);

// ============================
// GET ALL REELS
// ============================

router.get(
  "/",
  getReels
);

// ============================
// GET SINGLE REEL
// ============================

router.get(
  "/:id",
  getSingleReel
);

// ============================
// UPDATE REEL
// ============================

router.put(
  "/:id",
  updateReel
);

// ============================
// DELETE REEL
// ============================

router.delete(
  "/:id",
  deleteReel
);
router.get(

  "/teacher/:teacherId",

  getTeacherReels

);

module.exports =
  router;