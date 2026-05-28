const express =
  require("express");

const router =
  express.Router();

const {

  createQuestion,
  getQuestionsByTest,
  deleteQuestion,

} = require(
  "../controllers/questionController"
);

// ===============================
// QUESTION ROUTES
// ===============================

router.post(
  "/create",
  createQuestion
);

router.get(
  "/test/:testId",
  getQuestionsByTest
);

router.delete(
  "/delete/:id",
  deleteQuestion
);

module.exports =
  router;