
// // // const express =
// // //   require("express");

// // // const router =
// // //   express.Router();

// // // const upload = require(
// // //   "../middleware/upload"
// // // );

// // // const {
// // //   createExam,
// // //   getAllExams,
// // //   getSingleExam,
// // //   updateExam,
// // //   deleteExam,
// // // } = require(
// // //   "../controllers/examController"
// // // );


// // // // ===============================
// // // // CREATE EXAM
// // // // ===============================

// // // router.post(
// // //   "/create",
// // //   upload.single("image"),
// // //   createExam
// // // );


// // // // ===============================
// // // // GET ALL EXAMS
// // // // ===============================

// // // router.get(
// // //   "/all",
// // //   getAllExams
// // // );


// // // // ===============================
// // // // GET SINGLE EXAM
// // // // ===============================

// // // router.get(
// // //   "/single/:id",
// // //   getSingleExam
// // // );


// // // // ===============================
// // // // UPDATE EXAM
// // // // ===============================

// // // router.put(
// // //   "/update/:id",
// // //   upload.single("image"),
// // //   updateExam
// // // );


// // // // ===============================
// // // // DELETE EXAM
// // // // ===============================

// // // router.delete(
// // //   "/delete/:id",
// // //   deleteExam
// // // );


// // // module.exports = router;

// // const express =
// //   require("express");

// // const router =
// //   express.Router();

// // const upload = require(
// //   "../middleware/upload"
// // );

// // const {

// //   createExam,

// //   getAllExams,

// //   getSingleExam,

// //   updateExam,

// //   deleteExam,

// // } = require(
// //   "../controllers/examController"
// // );


// // // ===============================
// // // CREATE EXAM
// // // ===============================

// // router.post(
// //   "/create",
// //   upload.single("image"),
// //   createExam
// // );


// // // ===============================
// // // GET ALL EXAMS
// // // ===============================

// // router.get(
// //   "/all",
// //   getAllExams
// // );


// // // ===============================
// // // GET SINGLE EXAM
// // // ===============================

// // router.get(
// //   "/single/:id",
// //   getSingleExam
// // );


// // // ===============================
// // // UPDATE EXAM
// // // ===============================

// // router.put(
// //   "/update/:id",
// //   upload.single("image"),
// //   updateExam
// // );


// // // ===============================
// // // DELETE EXAM
// // // ===============================

// // router.delete(
// //   "/delete/:id",
// //   deleteExam
// // );


// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const upload = require("../middleware/upload");

// const {

//   // EXAM
//   createExam,
//   getAllExams,
//   getSingleExam,
//   updateExam,
//   deleteExam,

//   // SUBJECT
//   addSubject,
//   getAllSubjects,
//   updateSubject,
//   deleteSubject,

//   // CHAPTER
//   addChapter,
//   getAllChapters,
//   updateChapter,
//   deleteChapter,

// } = require("../controllers/examController");


// // ===============================================================
// //  EXAM ROUTES
// // ===============================================================

// // POST   /api/exams/create
// router.post("/create", upload.single("image"), createExam);

// // GET    /api/exams/all
// router.get("/all", getAllExams);

// // GET    /api/exams/single/:id
// router.get("/single/:id", getSingleExam);

// // PUT    /api/exams/update/:id
// router.put("/update/:id", upload.single("image"), updateExam);

// // DELETE /api/exams/delete/:id
// router.delete("/delete/:id", deleteExam);


// // ===============================================================
// //  SUBJECT ROUTES        /api/exams/:id/subjects
// // ===============================================================

// // POST   /api/exams/:id/subjects
// router.post("/:id/subjects", addSubject);

// // GET    /api/exams/:id/subjects
// router.get("/:id/subjects", getAllSubjects);

// // PUT    /api/exams/:id/subjects/:subjectId
// router.put("/:id/subjects/:subjectId", updateSubject);

// // DELETE /api/exams/:id/subjects/:subjectId
// router.delete("/:id/subjects/:subjectId", deleteSubject);


// // ===============================================================
// //  CHAPTER ROUTES        /api/exams/:id/subjects/:subjectId/chapters
// // ===============================================================

// // POST   /api/exams/:id/subjects/:subjectId/chapters
// router.post(
//   "/:id/subjects/:subjectId/chapters",
//   upload.single("image"),
//   addChapter
// );

// // GET    /api/exams/:id/subjects/:subjectId/chapters
// router.get(
//   "/:id/subjects/:subjectId/chapters",
//   getAllChapters
// );

// // PUT    /api/exams/:id/subjects/:subjectId/chapters/:chapterId
// router.put(
//   "/:id/subjects/:subjectId/chapters/:chapterId",
//   upload.single("image"),
//   updateChapter
// );

// // DELETE /api/exams/:id/subjects/:subjectId/chapters/:chapterId
// router.delete(
//   "/:id/subjects/:subjectId/chapters/:chapterId",
//   deleteChapter
// );


// module.exports = router;


const express =
  require("express");

const router =
  express.Router();

const upload = require(
  "../middleware/upload"
);

const {

  // EXAM

  createExam,

  getAllExams,

  getSingleExam,

  updateExam,

  deleteExam,

  // SUBJECT

  addSubject,

  getAllSubjects,

  updateSubject,

  deleteSubject,

  // CHAPTER

  addChapter,

  getAllChapters,

  updateChapter,

  deleteChapter,

} = require(
  "../controllers/examController"
);



router.post(
  "/create",
  upload.single("image"),
  createExam
);




router.get(
  "/all",
  getAllExams
);


// GET SINGLE EXAM

router.get(
  "/single/:id",
  getSingleExam
);


// UPDATE EXAM

router.put(
  "/update/:id",
  upload.single("image"),
  updateExam
);


// DELETE EXAM

router.delete(
  "/delete/:id",
  deleteExam
);


// ===============================================================
// SUBJECT ROUTES
// ===============================================================


// ADD SUBJECT

router.post(
  "/:id/subjects",
  addSubject
);


// GET ALL SUBJECTS

router.get(
  "/:id/subjects",
  getAllSubjects
);


// UPDATE SUBJECT

router.put(
  "/:id/subjects/:subjectId",
  updateSubject
);


// DELETE SUBJECT

router.delete(
  "/:id/subjects/:subjectId",
  deleteSubject
);


// ===============================================================
// CHAPTER ROUTES
// ===============================================================


// ADD CHAPTER

router.post(
  "/:id/subjects/:subjectId/chapters",
  upload.single("image"),
  addChapter
);


// GET ALL CHAPTERS

router.get(
  "/:id/subjects/:subjectId/chapters",
  getAllChapters
);


// UPDATE CHAPTER

router.put(
  "/:id/subjects/:subjectId/chapters/:chapterId",
  upload.single("image"),
  updateChapter
);


// DELETE CHAPTER

router.delete(
  "/:id/subjects/:subjectId/chapters/:chapterId",
  deleteChapter
);


// ===============================================================
// EXPORT
// ===============================================================

module.exports = router;