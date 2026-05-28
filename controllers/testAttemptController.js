// const TestAttempt =
//   require(
//     "../models/TestAttempt"
//   );

// const Test =
//   require("../models/Test");

// const Question =
//   require(
//     "../models/Question"
//   );

// // =================================
// // SUBMIT TEST
// // =================================

// exports.submitTest =
//   async (req, res) => {

//     try {

//       const {
//         test,
//         answers,
//       } = req.body;

//       // =========================
//       // USER FROM TOKEN
//       // =========================

//       const user =
//         req.user.id;

//       // =========================
//       // CHECK TEST
//       // =========================

//       const testData =
//         await Test.findById(
//           test
//         );

//       if (!testData) {

//         return res.status(404).json({

//           success: false,

//           message:
//             "Test not found",

//         });

//       }

//       // =========================
//       // ALREADY SUBMITTED
//       // =========================

//       const alreadyAttempted =
//         await TestAttempt.findOne({

//           user,
//           test,

//         });

//       if (alreadyAttempted) {

//         return res.status(400).json({

//           success: false,

//           message:
//             "Test already submitted",

//         });

//       }

//       let correct = 0;

//       let wrong = 0;

//       let finalAnswers = [];

//       // =========================
//       // CHECK ANSWERS
//       // =========================

//       for (const item of answers) {

//         const question =
//           await Question.findById(
//             item.question
//           );

//         if (!question) continue;

//         const isCorrect =

//           question.correctAnswer ===
//           item.selectedOption;

//         if (isCorrect) {

//           correct++;

//         } else {

//           wrong++;

//         }

//         finalAnswers.push({

//           question:
//             question._id,

//           selectedOption:
//             item.selectedOption,

//           correctAnswer:
//             question.correctAnswer,

//           isCorrect,

//         });

//       }

//       // =========================
//       // SCORE
//       // =========================

//       const totalQuestions =
//         answers.length;

//       const percentage =
//         totalQuestions > 0

//           ? (
//               (
//                 correct /
//                 totalQuestions
//               ) * 100
//             ).toFixed(2)

//           : 0;

//       // =========================
//       // SAVE ATTEMPT
//       // =========================

//       const attempt =
//         await TestAttempt.create({

//           user,

//           test,

//           answers:
//             finalAnswers,

//           totalQuestions,

//           correctAnswers:
//             correct,

//           wrongAnswers:
//             wrong,

//           score:
//             correct,

//           percentage,

//         });

//       // =========================
//       // RESPONSE
//       // =========================

//       res.status(201).json({

//         success: true,

//         message:
//           "Test submitted successfully",

//         result: {

//           totalQuestions,

//           correctAnswers:
//             correct,

//           wrongAnswers:
//             wrong,

//           score:
//             correct,

//           percentage,

//         },

//         attempt,

//       });

//     } catch (error) {

//       console.log(error);

//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }

//   };

// // =================================
// // GET MY ATTEMPTS
// // =================================

// exports.getMyAttempts =
//   async (req, res) => {

//     try {

//       const user =
//         req.user.id;

//       const attempts =
//         await TestAttempt.find({

//           user,

//         })

//           .populate({
//             path: "test",

//             populate: [
//               {
//                 path: "exam",
//               },

//               {
//                 path: "teacher",
//               },
//             ],
//           })

//           .sort({
//             createdAt: -1,
//           });

//       res.status(200).json({

//         success: true,

//         total:
//           attempts.length,

//         attempts,

//       });

//     } catch (error) {

//       console.log(error);

//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }

//   };

// // =================================
// // GET SINGLE ATTEMPT
// // =================================

// exports.getSingleAttempt =
//   async (req, res) => {

//     try {

//       const attempt =
//         await TestAttempt.findById(

//           req.params.id

//         )

//           .populate("user")

//           .populate({

//             path: "test",

//             populate: [

//               {
//                 path: "exam",
//               },

//               {
//                 path: "teacher",
//               },

//             ],

//           })

//           .populate(
//             "answers.question"
//           );

//       if (!attempt) {

//         return res.status(404).json({

//           success: false,

//           message:
//             "Attempt not found",

//         });

//       }

//       res.status(200).json({

//         success: true,

//         attempt,

//       });

//     } catch (error) {

//       console.log(error);

//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }

//   };

const TestAttempt =
  require(
    "../models/TestAttempt"
  );

const Test =
  require("../models/Test");

const Question =
  require(
    "../models/Question"
  );

// =================================
// SUBMIT TEST
// =================================

exports.submitTest =
  async (req, res) => {

    try {

      const {
        test,
        answers,
      } = req.body;

      // =========================
      // USER FROM TOKEN
      // =========================

      const user =
        req.user._id;

      // =========================
      // CHECK TEST
      // =========================

      const testData =
        await Test.findById(
          test
        );

      if (!testData) {

        return res.status(404).json({

          success: false,

          message:
            "Test not found",

        });

      }

      // =========================
      // CHECK ALREADY ATTEMPTED
      // =========================

      const alreadyAttempted =
        await TestAttempt.findOne({

          user,
          test,

        });

      if (alreadyAttempted) {

        return res.status(400).json({

          success: false,

          message:
            "Test already submitted",

        });

      }

      // =========================
      // SCORE VARIABLES
      // =========================

      let correct = 0;

      let wrong = 0;

      let score = 0;

      let finalAnswers = [];

      // =========================
      // CHECK ANSWERS
      // =========================

      for (const item of answers) {

        const question =
          await Question.findById(
            item.question
          );

        if (!question) continue;

        // =========================
        // CHECK ANSWER
        // =========================

        const isCorrect =

          question.correctAnswer ===
          item.selectedOption;

        // =========================
        // SCORE CALCULATION
        // =========================

        if (isCorrect) {

          correct++;

          score +=
            question.marks;

        } else {

          wrong++;

          score -=
            question.negativeMarks;

        }

        // =========================
        // SAVE ANSWERS
        // =========================

        finalAnswers.push({

          question:
            question._id,

          // =====================
          // ANALYTICS
          // =====================

          subject:
            question.subject,

          chapter:
            question.chapter,

          topic:
            question.topic,

          // =====================
          // ANSWER
          // =====================

          selectedOption:
            item.selectedOption,

          correctAnswer:
            question.correctAnswer,

          isCorrect,

          // =====================
          // MARKING
          // =====================

          marks:
            question.marks,

          negativeMarks:
            question.negativeMarks,

        });

      }

      // =========================
      // TOTAL QUESTIONS
      // =========================

      const totalQuestions =
        answers.length;

      // =========================
      // PERCENTAGE
      // =========================

      const percentage =

        totalQuestions > 0

          ? (
              (
                correct /
                totalQuestions
              ) * 100
            ).toFixed(2)

          : 0;

      // =========================
      // SAVE ATTEMPT
      // =========================

      const attempt =
        await TestAttempt.create({

          user,

          test,

          answers:
            finalAnswers,

          totalQuestions,

          correctAnswers:
            correct,

          wrongAnswers:
            wrong,

          score:
            score,

          percentage,

        });

      // =========================
      // RESPONSE
      // =========================

      res.status(201).json({

        success: true,

        message:
          "Test submitted successfully",

        result: {

          totalQuestions,

          correctAnswers:
            correct,

          wrongAnswers:
            wrong,

          score:
            score,

          percentage,

        },

        attempt,

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

// =================================
// GET MY ATTEMPTS
// =================================

exports.getMyAttempts =
  async (req, res) => {

    try {

      const user =
        req.user._id;

      const attempts =
        await TestAttempt.find({

          user,

        })

          .populate({

            path: "test",

            populate: [

              {
                path: "exam",
              },

              {
                path: "teacher",
              },

            ],

          })

          .sort({

            createdAt: -1,

          });

      res.status(200).json({

        success: true,

        total:
          attempts.length,

        attempts,

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

// =================================
// GET SINGLE ATTEMPT
// =================================

exports.getSingleAttempt =
  async (req, res) => {

    try {

      const attempt =
        await TestAttempt.findById(

          req.params.id

        )

          .populate("user")

          .populate({

            path: "test",

            populate: [

              {
                path: "exam",
              },

              {
                path: "teacher",
              },

            ],

          })

          .populate(
            "answers.question"
          );

      if (!attempt) {

        return res.status(404).json({

          success: false,

          message:
            "Attempt not found",

        });

      }

      res.status(200).json({

        success: true,

        attempt,

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

// =================================
// PERFORMANCE ANALYSIS
// =================================

exports.getPerformanceAnalysis =
  async (req, res) => {

    try {

      const user =
        req.user._id;

      const attempts =
        await TestAttempt.find({

          user,

        });

      // =========================
      // ANALYTICS OBJECTS
      // =========================

      const subjectStats = {};

      const chapterStats = {};

      const topicStats = {};

      // =========================
      // LOOP ATTEMPTS
      // =========================

      for (const attempt of attempts) {

        for (const ans of attempt.answers) {

          // =====================
          // SUBJECT ANALYSIS
          // =====================

          if (!subjectStats[ans.subject]) {

            subjectStats[ans.subject] = {

              total: 0,
              correct: 0,
              wrong: 0,

            };

          }

          subjectStats[
            ans.subject
          ].total += 1;

          if (ans.isCorrect) {

            subjectStats[
              ans.subject
            ].correct += 1;

          } else {

            subjectStats[
              ans.subject
            ].wrong += 1;

          }

          // =====================
          // CHAPTER ANALYSIS
          // =====================

          if (!chapterStats[ans.chapter]) {

            chapterStats[ans.chapter] = {

              total: 0,
              correct: 0,
              wrong: 0,

            };

          }

          chapterStats[
            ans.chapter
          ].total += 1;

          if (ans.isCorrect) {

            chapterStats[
              ans.chapter
            ].correct += 1;

          } else {

            chapterStats[
              ans.chapter
            ].wrong += 1;

          }

          // =====================
          // TOPIC ANALYSIS
          // =====================

          if (!topicStats[ans.topic]) {

            topicStats[ans.topic] = {

              total: 0,
              correct: 0,
              wrong: 0,

            };

          }

          topicStats[
            ans.topic
          ].total += 1;

          if (ans.isCorrect) {

            topicStats[
              ans.topic
            ].correct += 1;

          } else {

            topicStats[
              ans.topic
            ].wrong += 1;

          }

        }

      }

      // =========================
      // SUBJECT RESULT
      // =========================

      const subjectAnalysis =

        Object.keys(subjectStats)

          .map((key) => {

            const data =
              subjectStats[key];

            return {

              subject: key,

              total:
                data.total,

              correct:
                data.correct,

              wrong:
                data.wrong,

              accuracy:
                (
                  (
                    data.correct /
                    data.total
                  ) * 100
                ).toFixed(2),

              weak:
                (
                  (
                    data.correct /
                    data.total
                  ) * 100
                ) < 60,

            };

          });

      // =========================
      // CHAPTER RESULT
      // =========================

      const chapterAnalysis =

        Object.keys(chapterStats)

          .map((key) => {

            const data =
              chapterStats[key];

            return {

              chapter: key,

              total:
                data.total,

              correct:
                data.correct,

              wrong:
                data.wrong,

              accuracy:
                (
                  (
                    data.correct /
                    data.total
                  ) * 100
                ).toFixed(2),

              weak:
                (
                  (
                    data.correct /
                    data.total
                  ) * 100
                ) < 60,

            };

          });

      // =========================
      // TOPIC RESULT
      // =========================

      const topicAnalysis =

        Object.keys(topicStats)

          .map((key) => {

            const data =
              topicStats[key];

            return {

              topic: key,

              total:
                data.total,

              correct:
                data.correct,

              wrong:
                data.wrong,

              accuracy:
                (
                  (
                    data.correct /
                    data.total
                  ) * 100
                ).toFixed(2),

              weak:
                (
                  (
                    data.correct /
                    data.total
                  ) * 100
                ) < 60,

            };

          });

      res.status(200).json({

        success: true,

        totalAttempts:
          attempts.length,

        subjectAnalysis,

        chapterAnalysis,

        topicAnalysis,

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