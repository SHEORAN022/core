const express =
  require("express");

const router =
  express.Router();

const {

  upsertQuestion,

  fetchQuestions,

  fetchQuestionsForAssessment,

  softDeleteQuestion,

} = require(
  "../controllers/questionController"
);

router.post(
  "/",
  upsertQuestion
);

router.put(
  "/:id",
  upsertQuestion
);

router.get(
  "/",
  fetchQuestions
);

router.get(
  "/assessment/:assessmentId",
  fetchQuestionsForAssessment
);

router.delete(
  "/:id",
  softDeleteQuestion
);

module.exports =
  router;