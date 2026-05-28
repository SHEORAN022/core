const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createVideo,
  getVideos,
  getVideosBySubject,
  getSingleVideo,
  updateVideo,
  deleteVideo,
} = require("../controllers/videoController");

// ===========================
// CREATE VIDEO
// ===========================

router.post(
  "/create",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  createVideo
);

// ===========================
// GET ALL VIDEOS
// ===========================

router.get("/", getVideos);

// ===========================
// GET VIDEOS BY SUBJECT
// ===========================

router.get("/subject/:subjectId", getVideosBySubject);

// ===========================
// GET SINGLE VIDEO
// ===========================

router.get("/:id", getSingleVideo);

// ===========================
// UPDATE VIDEO
// ===========================

router.put(
  "/:id",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  updateVideo
);

// ===========================
// DELETE VIDEO
// ===========================

router.delete("/:id", deleteVideo);

module.exports = router;