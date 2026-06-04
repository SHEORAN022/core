const express =
  require("express");

const router =
  express.Router();

// ======================
// MIDDLEWARE
// ======================

const {
  userAuth,
} = require(
  "../middleware/authMiddleware"
);

// ======================
// CONTROLLER
// ======================

const {
  selectExam,
} = require(
  "../controllers/studentController"
);

// ======================
// SELECT EXAM
// ======================

router.post(

  "/select-exam",

  userAuth,

  selectExam

);

module.exports =
  router;