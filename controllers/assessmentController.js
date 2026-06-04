const Assessment =
  require("../models/Assessment");

const Question =
  require("../models/Question");



// ======================================
// CREATE / UPDATE ASSESSMENT
// ======================================

exports.upsertAssessment =
  async (req, res) => {

    try {

      const {

        title,
        type,

      } = req.body;



      // ======================================
      // VALIDATION
      // ======================================

      if (!title) {

        return res.status(400).json({

          success: false,

          message:
            "Title is required",

        });

      }



      if (!type) {

        return res.status(400).json({

          success: false,

          message:
            "Type is required",

        });

      }



      let assessment;



      // ======================================
      // UPDATE
      // ======================================

      if (req.params.id) {

        assessment =
          await Assessment.findByIdAndUpdate(

            req.params.id,

            {

              title:
                req.body.title,

              type:
                req.body.type,

              exam_id:
                req.body.exam_id,

              teacher_id:
                req.body.teacher_id,

              subject_id:
                req.body.subject_id,

              chapter_id:
                req.body.chapter_id,

              topic_id:
                req.body.topic_id,

              duration:
                req.body.duration,

              total_questions:
                req.body.total_questions,

              negative_marking:
                req.body.negative_marking,

              leaderboard_enabled:
                req.body.leaderboard_enabled,

              is_pro:
                req.body.is_pro,

              is_active:
                req.body.is_active,

              thumbnail_url:
                req.body.thumbnail_url,

              start_at:
                req.body.start_at,

              end_at:
                req.body.end_at,

            },

            {

              returnDocument:
                "after",

            }

          )

          .populate("exam_id")
          .populate("teacher_id")
          .populate("subject_id")
          .populate("chapter_id")
          .populate("topic_id");



        if (!assessment) {

          return res.status(404).json({

            success: false,

            message:
              "Assessment not found",

          });

        }

      }



      // ======================================
      // CREATE
      // ======================================

      else {

        assessment =
          await Assessment.create({

            title:
              req.body.title,

            type:
              req.body.type,

            exam_id:
              req.body.exam_id,

            teacher_id:
              req.body.teacher_id,

            subject_id:
              req.body.subject_id,

            chapter_id:
              req.body.chapter_id,

            topic_id:
              req.body.topic_id,

            duration:
              req.body.duration,

            total_questions:
              req.body.total_questions,

            negative_marking:
              req.body.negative_marking,

            leaderboard_enabled:
              req.body.leaderboard_enabled,

            is_pro:
              req.body.is_pro,

            is_active:
              req.body.is_active,

            thumbnail_url:
              req.body.thumbnail_url,

            start_at:
              req.body.start_at,

            end_at:
              req.body.end_at,

          });



        assessment =
          await Assessment.findById(

            assessment._id

          )

          .populate("exam_id")
          .populate("teacher_id")
          .populate("subject_id")
          .populate("chapter_id")
          .populate("topic_id");

      }



      // ======================================
      // RESPONSE
      // ======================================

      res.status(200).json({

        success: true,



        message:
          req.params.id

            ? "Assessment updated successfully"

            : "Assessment created successfully",



        assessment,

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



// ======================================
// GET ALL ASSESSMENTS
// ======================================

exports.fetchAllAssessments =
  async (req, res) => {

    try {

      const assessments =
        await Assessment.find({

          is_deleted: false,

        })

        .populate("exam_id")
        .populate("teacher_id")
        .populate("subject_id")
        .populate("chapter_id")
        .populate("topic_id")

        .sort({

          createdAt: -1,

        });



      // ======================================
      // ADD QUESTIONS
      // ======================================

      const finalAssessments =
        await Promise.all(

          assessments.map(
            async (assessment) => {

              const questions =
                await Question.find({

                  assessment_id:
                    assessment._id,

                  is_deleted:
                    false,

                })

                .populate("topic_id")
                .populate("subject_id")
                .populate("chapter_id");



              return {

                ...assessment.toObject(),

                questions,

              };

            }
          )
        );



      res.status(200).json({

        success: true,



        count:
          finalAssessments.length,



        assessments:
          finalAssessments,

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



// ======================================
// GET SINGLE ASSESSMENT
// ======================================

exports.fetchAssessmentById =
  async (req, res) => {

    try {

      const assessment =
        await Assessment.findById(

          req.params.id

        )

        .populate("exam_id")
        .populate("teacher_id")
        .populate("subject_id")
        .populate("chapter_id")
        .populate("topic_id");



      if (!assessment) {

        return res.status(404).json({

          success: false,



          message:
            "Assessment not found",

        });

      }



      // ======================================
      // FETCH QUESTIONS
      // ======================================

      const questions =
        await Question.find({

          assessment_id:
            assessment._id,

          is_deleted:
            false,

        })

        .populate("topic_id")
        .populate("subject_id")
        .populate("chapter_id")

        .sort({

          createdAt: -1,

        });



      res.status(200).json({

        success: true,



        assessment,



        questions,



        total_questions:
          questions.length,

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



// ======================================
// GET UPCOMING TESTS
// ======================================

exports.fetchUpcomingTests =
  async (req, res) => {

    try {

      const now =
        new Date();



      const tests =
        await Assessment.find({

          is_deleted: false,

          is_active: true,



          start_at: {

            $gt: now,

          },

        })

        .populate("exam_id")
        .populate("teacher_id")
        .populate("subject_id")
        .populate("chapter_id")
        .populate("topic_id")

        .sort({

          start_at: 1,

        });



      res.status(200).json({

        success: true,



        count:
          tests.length,



        tests,

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



// ======================================
// GET ACTIVE TESTS
// ======================================

exports.fetchActiveTests =
  async (req, res) => {

    try {

      const now =
        new Date();



      const tests =
        await Assessment.find({

          is_deleted: false,

          is_active: true,



          start_at: {

            $lte: now,

          },



          end_at: {

            $gte: now,

          },

        })

        .populate("exam_id")
        .populate("teacher_id")
        .populate("subject_id")
        .populate("chapter_id")
        .populate("topic_id")

        .sort({

          start_at: 1,

        });



      res.status(200).json({

        success: true,



        count:
          tests.length,



        tests,

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



// ======================================
// DELETE ASSESSMENT
// ======================================

exports.softDeleteAssessment =
  async (req, res) => {

    try {

      const assessment =
        await Assessment.findByIdAndUpdate(

          req.params.id,

          {

            is_deleted: true,

          },

          {

            returnDocument:
              "after",

          }

        );



      if (!assessment) {

        return res.status(404).json({

          success: false,



          message:
            "Assessment not found",

        });

      }



      res.status(200).json({

        success: true,



        message:
          "Assessment deleted successfully",

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


// ======================================
// SUBMIT ASSESSMENT
// ======================================

exports.submitAssessment =
  async (req, res) => {

    try {

      const assessmentId =
        req.params.assessmentId;

      const answers =
        req.body.answers;



      // ======================================
      // FETCH QUESTIONS
      // ======================================

      const questions =
        await Question.find({

          assessment_id:
            assessmentId,

          is_deleted:
            false,

        });



      let correct =
        0;

      let wrong =
        0;

      let score =
        0;



      const results =
        [];



      // ======================================
      // CHECK ANSWERS
      // ======================================

      for (
        const question of questions
      ) {

        const userAnswer =
          answers.find(

            (item) =>

              item.question_id ===

              question._id.toString()

          );



        let isCorrect =
          false;



        if (userAnswer) {

          isCorrect =

            userAnswer.selected_option ===

            question.correct_answer;

        }



        // CORRECT

        if (isCorrect) {

          correct++;

          score +=
            question.marks;

        }

        // WRONG

        else {

          wrong++;

          score -=
            question.negative_marks;

        }



        results.push({

          question_id:
            question._id,



          question:
            question.question_text,



          selected_option:
            userAnswer

              ? userAnswer.selected_option

              : null,



          correct_answer:
            question.correct_answer,



          is_correct:
            isCorrect,



          explanation:
            question.explanation,

        });

      }



      // ======================================
      // PERCENTAGE
      // ======================================

      const percentage =

        (
          (correct /
            questions.length) *
          100
        ).toFixed(2);



      // ======================================
      // RESPONSE
      // ======================================

      res.status(200).json({

        success: true,



        performance: {

          total_questions:
            questions.length,



          correct_answers:
            correct,



          wrong_answers:
            wrong,



          score,



          percentage,

        },



        results,

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

