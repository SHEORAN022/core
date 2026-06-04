const express =
  require("express");

const router =
  express.Router();

const multer =
  require("multer");

const storage =
  multer.memoryStorage();

const upload =
  multer({

    storage,

  });

const {

  createTopVideo,

  getTopVideos,

  getSingleTopVideo,

  getVideosBySubject,

  getVideosByTopic,

  updateTopVideo,

  deleteTopVideo,

  increaseViews,

} = require(

  "../controllers/topVideoController"

);

// ======================================
// CREATE TOP VIDEO
// ======================================

router.post(

  "/create",

  upload.fields([

    {
      name: "video",
      maxCount: 1,
    },

    {
      name: "thumbnail",
      maxCount: 1,
    },

  ]),

  createTopVideo

);

// ======================================
// GET ALL VIDEOS
// ======================================

router.get(

  "/",

  getTopVideos

);

// ======================================
// GET SINGLE VIDEO
// ======================================

router.get(

  "/single/:id",

  getSingleTopVideo

);

// ======================================
// GET SUBJECT VIDEOS
// ======================================

router.get(

  "/subject/:subjectId",

  getVideosBySubject

);

// ======================================
// GET TOPIC VIDEOS
// ======================================

router.get(

  "/topic/:topic",

  getVideosByTopic

);

// ======================================
// UPDATE VIDEO
// ======================================

router.put(

  "/update/:id",

  upload.fields([

    {
      name: "video",
      maxCount: 1,
    },

    {
      name: "thumbnail",
      maxCount: 1,
    },

  ]),

  updateTopVideo

);

// ======================================
// DELETE VIDEO
// ======================================

router.delete(

  "/delete/:id",

  deleteTopVideo

);

// ======================================
// INCREASE VIEWS
// ======================================

router.put(

  "/views/:id",

  increaseViews

);

module.exports =
  router;