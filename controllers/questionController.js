const Question =
  require("../models/Question");

const Test =
  require("../models/Test");

// ===============================
// CREATE QUESTION
// ===============================

exports.createQuestion =
  async (req, res) => {

    try {

      const {

        test,
        question,
        options,
        correctAnswer,
        explanation,
        marks,
        negativeMarks,
        subject,

      } = req.body;

      // ===============================
      // CHECK TEST
      // ===============================

      const testData =
        await Test.findById(test);

      if (!testData) {

        return res.status(404).json({

          success: false,

          message:
            "Test not found",

        });

      }

      // ===============================
      // CREATE QUESTION
      // ===============================

      const newQuestion =
        await Question.create({

          test,
          question,
          options,
          correctAnswer,
          explanation,
          marks,
          negativeMarks,
          subject,

        });

      // ===============================
      // UPDATE QUESTION COUNT
      // ===============================

      await Test.findByIdAndUpdate(

        test,

        {

          $inc: {
            totalQuestions: 1,
          },

        }

      );

      res.status(201).json({

        success: true,

        message:
          "Question added successfully",

        question:
          newQuestion,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

// ===============================
// GET QUESTIONS BY TEST
// ===============================

exports.getQuestionsByTest =
  async (req, res) => {

    try {

      const questions =
        await Question.find({

          test:
            req.params.testId,

        });

      res.status(200).json({

        success: true,

        total:
          questions.length,

        questions,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

// ===============================
// DELETE QUESTION
// ===============================

exports.deleteQuestion =
  async (req, res) => {

    try {

      const question =
        await Question.findById(
          req.params.id
        );

      if (!question) {

        return res.status(404).json({

          success: false,

          message:
            "Question not found",

        });

      }

      // ===============================
      // DECREASE COUNT
      // ===============================

      await Test.findByIdAndUpdate(

        question.test,

        {

          $inc: {
            totalQuestions: -1,
          },

        }

      );

      await Question.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({

        success: true,

        message:
          "Question deleted successfully",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };