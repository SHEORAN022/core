const express =
  require("express");

const router =
  express.Router();

const upload =
  require("../middleware/upload");

const {

  createReel,
  fetchAllReels,
  fetchPyqReels,
  fetchSingleReel,
  updateReel,
  softDeleteReel,
  fetchTopVideos,
  getTeacherReels,
   fetchNewArrivalReels,

} = require(
  "../controllers/reelController"
);



// FILE UPLOAD

const reelUpload =
  upload.fields([

    {
      name: "video",
      maxCount: 1,
    },

    {
      name: "thumbnail",
      maxCount: 1,
    },

  ]);



// ======================================
// CREATE
// ======================================

router.post(
  "/create",
  reelUpload,
  createReel
);



// ======================================
// GET ALL
// ======================================

router.get(
  "/",
  fetchAllReels
);



// ======================================
// GET PYQ
// ======================================

router.get(
  "/pyq",
  fetchPyqReels
);

router.get("/new-arrivals", fetchNewArrivalReels);

// ======================================
// GET SINGLE
// ======================================

router.get(
  "/:id",
  fetchSingleReel
);



// ======================================
// UPDATE
// ======================================

router.put(
  "/:id",
  reelUpload,
  updateReel
);



// ======================================
// DELETE
// ======================================

router.delete(
  "/:id",
  softDeleteReel
);

router.get( "/teacher/:teacherId", getTeacherReels );

router.get( "/top/videos", fetchTopVideos );

module.exports =
  router;