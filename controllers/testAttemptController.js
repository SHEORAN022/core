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

const Reel =
  require(
    "../models/Reel"
  );

const Video =
  require(
    "../models/Video"
  );

const User =
  require(
    "../models/User"
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
      // VALIDATION
      // =========================

      if (
        !test ||
        !answers ||
        !Array.isArray(
          answers
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid request data",

        });

      }

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
      // MULTIPLE ATTEMPTS
      // =========================

      const previousAttempts =
        await TestAttempt.countDocuments({

          user,
          test,

        });

      const attemptNumber =
        previousAttempts + 1;

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

        if (!question)
          continue;

        // =========================
        // CHECK ANSWER
        // =========================

        const isCorrect =

          question.correctAnswer
            .trim()
            .toLowerCase()

          ===

          item.selectedOption
            .trim()
            .toLowerCase();

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
          // ANSWER DATA
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

          ? Number(

              (
                (
                  correct /
                  totalQuestions
                ) * 100
              ).toFixed(2)

            )

          : 0;

      // =========================
      // SAVE ATTEMPT
      // =========================

      const attempt =
        await TestAttempt.create({

          user,

          test,

          type:
            "Study",

          attemptNumber,

          answers:
            finalAnswers,

          totalQuestions,

          correctAnswers:
            correct,

          wrongAnswers:
            wrong,

          score,

          percentage,

        });

      // =========================
      // WEAK TOPICS
      // =========================

      const weakTopics =

        finalAnswers.filter(
          (item) =>
            !item.isCorrect
        );

      // =========================
      // RECOMMENDED CONTENT
      // =========================

      let recommendedReels = [];

      let recommendedVideos = [];

      // =========================
      // LOOP WEAK TOPICS
      // =========================

      for (const weak of weakTopics) {

        // =====================
        // REELS
        // =====================

        const reels =
          await Reel.find({

            status:
              "Active",

            subject:
              weak.subject,

            chapter:
              weak.chapter,

            topic:
              weak.topic,

          })

            .populate(
              "teacher"
            )

            .limit(10);

        recommendedReels.push(
          ...reels
        );

        // =====================
        // VIDEOS
        // =====================

        const videos =
          await Video.find({

            status:
              "Active",

            chapter:
              weak.chapter,

            topic:
              weak.topic,

          })

            .populate(
              "subject"
            )

            .limit(10);

        recommendedVideos.push(
          ...videos
        );

      }

      // =========================
      // REMOVE DUPLICATE REELS
      // =========================

      const uniqueReels =

        Array.from(

          new Map(

            recommendedReels.map(
              (item) => [

                item._id.toString(),

                item,

              ]
            )

          ).values()

        );

      // =========================
      // REMOVE DUPLICATE VIDEOS
      // =========================

      const uniqueVideos =

        Array.from(

          new Map(

            recommendedVideos.map(
              (item) => [

                item._id.toString(),

                item,

              ]
            )

          ).values()

        );

      // =========================
      // SAVE FOR YOU FEED
      // =========================

      await User.findByIdAndUpdate(

        user,

        {

          forYouReels:

            uniqueReels.map(
              (item) =>
                item._id
            ),

          forYouVideos:

            uniqueVideos.map(
              (item) =>
                item._id
            ),

          feedType:
            "For You",

        }

      );

      // =========================
      // RESPONSE
      // =========================

      res.status(201).json({

        success: true,

        message:
          "Test submitted successfully",

        result: {

          attemptNumber,

          totalQuestions,

          correctAnswers:
            correct,

          wrongAnswers:
            wrong,

          score,

          percentage,

        },

        // =====================
        // WEAK AREAS
        // =====================

        weakAreas:

          weakTopics.map(
            (item) => ({

              subject:
                item.subject,

              chapter:
                item.chapter,

              topic:
                item.topic,

            })
          ),

        // =====================
        // RECOMMENDED REELS
        // =====================

        recommendedReels:
          uniqueReels,

        // =====================
        // RECOMMENDED VIDEOS
        // =====================

        recommendedVideos:
          uniqueVideos,

        // =====================
        // FULL ATTEMPT
        // =====================

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

              {
                path: "category",
              },

            ],

          })

          .populate(
            "answers.question"
          )

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

              {
                path: "category",
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
          // SUBJECT
          // =====================

          if (
            !subjectStats[
              ans.subject
            ]
          ) {

            subjectStats[
              ans.subject
            ] = {

              total: 0,
              correct: 0,
              wrong: 0,

            };

          }

          subjectStats[
            ans.subject
          ].total++;

          if (ans.isCorrect) {

            subjectStats[
              ans.subject
            ].correct++;

          } else {

            subjectStats[
              ans.subject
            ].wrong++;

          }

          // =====================
          // CHAPTER
          // =====================

          if (
            !chapterStats[
              ans.chapter
            ]
          ) {

            chapterStats[
              ans.chapter
            ] = {

              total: 0,
              correct: 0,
              wrong: 0,

            };

          }

          chapterStats[
            ans.chapter
          ].total++;

          if (ans.isCorrect) {

            chapterStats[
              ans.chapter
            ].correct++;

          } else {

            chapterStats[
              ans.chapter
            ].wrong++;

          }

          // =====================
          // TOPIC
          // =====================

          if (
            !topicStats[
              ans.topic
            ]
          ) {

            topicStats[
              ans.topic
            ] = {

              total: 0,
              correct: 0,
              wrong: 0,

            };

          }

          topicStats[
            ans.topic
          ].total++;

          if (ans.isCorrect) {

            topicStats[
              ans.topic
            ].correct++;

          } else {

            topicStats[
              ans.topic
            ].wrong++;

          }

        }

      }

      // =========================
      // SUBJECT ANALYSIS
      // =========================

      const subjectAnalysis =

        Object.keys(
          subjectStats
        ).map((key) => {

          const data =
            subjectStats[key];

          const accuracy =
            (
              (
                data.correct /
                data.total
              ) * 100
            ).toFixed(2);

          return {

            subject: key,

            total:
              data.total,

            correct:
              data.correct,

            wrong:
              data.wrong,

            accuracy,

            weak:
              accuracy < 60,

          };

        });

      // =========================
      // CHAPTER ANALYSIS
      // =========================

      const chapterAnalysis =

        Object.keys(
          chapterStats
        ).map((key) => {

          const data =
            chapterStats[key];

          const accuracy =
            (
              (
                data.correct /
                data.total
              ) * 100
            ).toFixed(2);

          return {

            chapter: key,

            total:
              data.total,

            correct:
              data.correct,

            wrong:
              data.wrong,

            accuracy,

            weak:
              accuracy < 60,

          };

        });

      // =========================
      // TOPIC ANALYSIS
      // =========================

      const topicAnalysis =

        Object.keys(
          topicStats
        ).map((key) => {

          const data =
            topicStats[key];

          const accuracy =
            (
              (
                data.correct /
                data.total
              ) * 100
            ).toFixed(2);

          return {

            topic: key,

            total:
              data.total,

            correct:
              data.correct,

            wrong:
              data.wrong,

            accuracy,

            weak:
              accuracy < 60,

          };

        });

      // =========================
      // RESPONSE
      // =========================

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

