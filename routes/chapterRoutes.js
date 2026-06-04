// const express = require("express");
// const router = express.Router();

// const {
//   createChapter,
//   getChaptersBySubject,
// } = require("../controllers/chapterController");

// router.post("/create", createChapter);

// router.get("/subject/:subjectId", getChaptersBySubject);

// module.exports = router;

const express =
  require("express");

const router =
  express.Router();

const {

  createChapter,
  getChaptersBySubject,
  getSingleChapter,
  updateChapter,
  deleteChapter,

} = require(
  "../controllers/chapterController"
);



// CREATE

router.post(
  "/create",
  createChapter
);



// GET BY SUBJECT

router.get(
  "/subject/:subjectId",
  getChaptersBySubject
);



// GET SINGLE

router.get(
  "/:id",
  getSingleChapter
);



// UPDATE

router.put(
  "/:id",
  updateChapter
);



// DELETE

router.delete(
  "/:id",
  deleteChapter
);

module.exports =
  router;