
// const express =
//   require("express");

// const router =
//   express.Router();

// const {

//   createReel,

//   getReels,

//   deleteReel,

// } = require(

//   "../controllers/reelModelController"

// );

// // =====================================
// // CREATE REEL
// // =====================================

// router.post(

//   "/create",

//   createReel

// );

// // =====================================
// // GET REELS
// // =====================================

// router.get(

//   "/",

//   getReels

// );

// // =====================================
// // DELETE REEL
// // =====================================

// router.delete(

//   "/:id",

//   deleteReel

// );

// module.exports =
//   router;



const express = require("express");
const router = express.Router();

const {
  createReel,
  getReels,
  getReelById,
  updateReel,
  deleteReel,
} = require("../controllers/reelModelController");

// =====================================
// CREATE REEL
// =====================================
router.post("/create", createReel);

// =====================================
// GET ALL REELS
// =====================================
router.get("/", getReels);

// =====================================
// GET SINGLE REEL
// =====================================
router.get("/:id", getReelById);

// =====================================
// UPDATE REEL
// =====================================
router.put("/:id", updateReel);

// =====================================
// DELETE REEL
// =====================================
router.delete("/:id", deleteReel);

module.exports = router;