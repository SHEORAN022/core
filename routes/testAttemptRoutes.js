const express =
  require("express");

const router =
  express.Router();

const userAuth =
  require(
    "../middleware/userAuth"
  );

const {

  submitTest,

  getMyAttempts,

  getSingleAttempt,

  getPerformanceAnalysis,

} = require(

  "../controllers/testAttemptController"

);

// =================================
// SUBMIT TEST
// =================================

router.post(

  "/submit",

  userAuth,

  submitTest

);



router.get(

  "/my-attempts",

  userAuth,

  getMyAttempts

);



router.get(

  "/single/:id",

  userAuth,

  getSingleAttempt

);



router.get(

  "/performance-analysis",

  userAuth,

  getPerformanceAnalysis

);

module.exports =
  router;