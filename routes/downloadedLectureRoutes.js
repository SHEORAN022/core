// =====================================
// routes/downloadedLectureRoutes.js
// =====================================

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

  downloadLecture,

  getDownloadedLectures,

  removeDownloadedLecture,

} = require(
  "../controllers/downloadedLectureController"
);

// DOWNLOAD

router.post(

  "/download",

  userAuth,

  downloadLecture

);

// GET DOWNLOADS

router.get(

  "/",

  userAuth,

  getDownloadedLectures

);

// REMOVE DOWNLOAD

router.delete(

  "/:reelId",

  userAuth,

  removeDownloadedLecture

);

module.exports =
  router;