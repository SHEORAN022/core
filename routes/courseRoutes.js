
// const express =
//   require("express");

// const router =
//   express.Router();

// const upload = require(
//   "../middleware/upload"
// );

// const {

//   createCourse,

//   getAllCourses,

//   getSingleCourse,

//   getCoursesByExam,

//   updateCourse,

//   deleteCourse,

//   uploadVideo,

// } = require(
//   "../controllers/courseController"
// );


// // ===============================
// // CREATE COURSE
// // ===============================

// router.post(
//   "/create",
//   upload.single("image"),
//   createCourse
// );


// // ===============================
// // GET ALL COURSES
// // ===============================

// router.get(
//   "/all",
//   getAllCourses
// );


// // ===============================
// // GET SINGLE COURSE
// // ===============================

// router.get(
//   "/single/:id",
//   getSingleCourse
// );


// // ===============================
// // GET COURSES BY EXAM
// // ===============================

// router.get(
//   "/exam/:examId",
//   getCoursesByExam
// );


// // ===============================
// // UPDATE COURSE
// // ===============================

// router.put(
//   "/update/:id",
//   upload.single("image"),
//   updateCourse
// );


// // ===============================
// // DELETE COURSE
// // ===============================

// router.delete(
//   "/delete/:id",
//   deleteCourse
// );


// // ===============================
// // VIDEO UPLOAD
// // ===============================

// router.post(
//   "/upload-video",
//   upload.single("video"),
//   uploadVideo
// );


// module.exports = router;


const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createCourse,
  getAllCourses,
  getSingleCourse,
  getCoursesByExam,
  updateCourse,
  deleteCourse,
  uploadVideo,
  addChapter,
  updateChapter,
  deleteChapter,
  addVideo,
  updateVideo,
  deleteVideo,
} = require("../controllers/courseController");

// ===============================
// COURSE ROUTES
// ===============================

router.post("/create", upload.single("image"), createCourse);
router.get("/all", getAllCourses);
router.get("/single/:id", getSingleCourse);
router.get("/exam/:examId", getCoursesByExam);
router.put("/update/:id", upload.single("image"), updateCourse);
router.delete("/delete/:id", deleteCourse);

// ===============================
// VIDEO UPLOAD ROUTE
// ===============================

router.post("/upload-video", upload.single("video"), uploadVideo);

// ===============================
// CHAPTER ROUTES
// ===============================

router.post("/:id/chapters", addChapter);
router.put("/:id/chapters/:chapterId", updateChapter);
router.delete("/:id/chapters/:chapterId", deleteChapter);

// ===============================
// VIDEO ROUTES (inside chapter)
// ===============================

router.post("/:id/chapters/:chapterId/videos", addVideo);
router.put("/:id/chapters/:chapterId/videos/:videoId", updateVideo);
router.delete("/:id/chapters/:chapterId/videos/:videoId", deleteVideo);

module.exports = router;