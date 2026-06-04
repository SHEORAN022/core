const express =
  require("express");

const router =
  express.Router();



// ======================================
// AUTH
// ======================================

const userAuth =
  require(
    "../middleware/userAuth"
  );



// ======================================
// CONTROLLERS
// ======================================

const {

  upsertAssessment,

  fetchAllAssessments,

  fetchAssessmentById,

  softDeleteAssessment,

  fetchUpcomingTests,

  fetchActiveTests,

  // fetchPyqTests,

  submitAssessment,

} = require(
  "../controllers/assessmentController"
);



// ======================================
// CREATE ASSESSMENT
// ======================================

router.post(
  "/",
  upsertAssessment
);



// ======================================
// UPDATE ASSESSMENT
// ======================================

router.put(
  "/:id",
  upsertAssessment
);



// ======================================
// GET ALL ASSESSMENTS
// ======================================

router.get(
  "/",
  fetchAllAssessments
);



// ======================================
// GET UPCOMING TESTS
// ======================================

router.get(
  "/upcoming",
  fetchUpcomingTests
);



// ======================================
// GET ACTIVE TESTS
// ======================================

router.get(
  "/active",
  fetchActiveTests
);



// ======================================
// GET PYQ TESTS
// ======================================

// router.get(
//   "/pyq",
//   fetchPyqTests
// );



// ======================================
// SUBMIT TEST
// ======================================

router.post(

  "/submit/:assessmentId",

  userAuth,

  submitAssessment

);



// ======================================
// GET SINGLE ASSESSMENT
// ======================================

router.get(
  "/:id",
  fetchAssessmentById
);



// ======================================
// DELETE ASSESSMENT
// ======================================

router.delete(
  "/:id",
  softDeleteAssessment
);



// ======================================
// EXPORT
// ======================================

module.exports =
  router;

