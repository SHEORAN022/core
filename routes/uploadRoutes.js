const express = require(
  "express"
);

const router =
  express.Router();

const upload = require(
  "../middleware/upload"
);

const {
  uploadImage,
  uploadVideo,
} = require(
  "../controllers/uploadController"
);


// IMAGE ROUTE

router.post(
  "/image",
  upload.single("image"),
  uploadImage
);


// VIDEO ROUTE

router.post(
  "/video",
  upload.single("video"),
  uploadVideo
);

module.exports = router;