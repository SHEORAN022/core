const express = require("express");
const router = express.Router();

const {
  createExam,
  getExams,
    deleteExam,
      updateExam,
} = require("../controllers/examController");

router.post("/create", createExam);

router.get("/", getExams);
router.delete(
  "/:id",
  deleteExam
);
router.delete(
  "/:id",
  deleteExam
);

module.exports = router;