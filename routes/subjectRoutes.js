// const express =
//   require("express");

// const router =
//   express.Router();

// const {

//   createSubject,

//   getSubjectsByExam,

// } = require(
//   "../controllers/subjectController"
// );



// // CREATE
// router.post(
//   "/create",
//   createSubject
// );



// // GET SUBJECTS WITH FULL DATA
// router.get(
//   "/exam/:examId",
//   getSubjectsByExam
// );

// module.exports =
//   router;

const express =
  require("express");

const router =
  express.Router();

const {

  createSubject,
  getSubjectsByExam,
  getSingleSubject,
  updateSubject,
  deleteSubject,

} = require(
  "../controllers/subjectController"
);



// CREATE

router.post(
  "/create",
  createSubject
);



// GET SUBJECTS BY EXAM

router.get(
  "/exam/:examId",
  getSubjectsByExam
);



// GET SINGLE

router.get(
  "/:id",
  getSingleSubject
);



// UPDATE

router.put(
  "/:id",
  updateSubject
);



// DELETE

router.delete(
  "/:id",
  deleteSubject
);

module.exports =
  router;