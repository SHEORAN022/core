// const Question =
//   require("../models/Question");

// const Assessment =
//   require("../models/Assessment");



// // ======================================
// // CREATE / UPDATE QUESTION
// // ======================================

// exports.upsertQuestion =
//   async (req, res) => {

//     try {

//       let question;



//       // ======================================
//       // UPDATE QUESTION
//       // ======================================

//       if (req.params.id) {

//         question =
//           await Question.findByIdAndUpdate(

//             req.params.id,

//             {

//               assessment_id:
//                 req.body.assessment_id,

//               exam_id:
//                 req.body.exam_id,

//               subject_id:
//                 req.body.subject_id,

//               chapter_id:
//                 req.body.chapter_id,

//               topic_id:
//                 req.body.topic_id,

//               question_text:
//                 req.body.question_text,

//               question_image_url:
//                 req.body.question_image_url,



//               // OPTIONS

//               options:
//                 req.body.options,



//               // CORRECT ANSWER

//               correct_answer:
//                 req.body.correct_answer,



//               // EXPLANATION

//               explanation:
//                 req.body.explanation,



//               explanation_image_url:
//                 req.body.explanation_image_url,



//               // MARKS

//               marks:
//                 req.body.marks,



//               negative_marks:
//                 req.body.negative_marks,



//               // DIFFICULTY

//               difficulty:
//                 req.body.difficulty,

//             },

//             {

//               returnDocument:
//                 "after",

//             }

//           )

//           .populate(
//             "assessment_id"
//           )

//           .populate(
//             "exam_id"
//           )

//           .populate(
//             "subject_id"
//           )

//           .populate(
//             "chapter_id"
//           )

//           .populate(
//             "topic_id"
//           );



//         if (!question) {

//           return res.status(404).json({

//             success: false,

//             message:
//               "Question not found",

//           });

//         }

//       }



//       // ======================================
//       // CREATE QUESTION
//       // ======================================

//       else {

//         question =
//           await Question.create({

//             assessment_id:
//               req.body.assessment_id,

//             exam_id:
//               req.body.exam_id,

//             subject_id:
//               req.body.subject_id,

//             chapter_id:
//               req.body.chapter_id,

//             topic_id:
//               req.body.topic_id,



//             // QUESTION

//             question_text:
//               req.body.question_text,



//             question_image_url:
//               req.body.question_image_url,



//             // OPTIONS

//             options:
//               req.body.options,



//             // CORRECT ANSWER

//             correct_answer:
//               req.body.correct_answer,



//             // EXPLANATION

//             explanation:
//               req.body.explanation,



//             explanation_image_url:
//               req.body.explanation_image_url,



//             // MARKS

//             marks:
//               req.body.marks,



//             negative_marks:
//               req.body.negative_marks,



//             // DIFFICULTY

//             difficulty:
//               req.body.difficulty,

//           });



//         // ======================================
//         // AUTO INCREASE QUESTION COUNT
//         // ======================================

//         await Assessment.findByIdAndUpdate(

//           req.body.assessment_id,

//           {

//             $inc: {

//               total_questions: 1,

//             },

//           }

//         );



//         question =
//           await Question.findById(

//             question._id

//           )

//           .populate(
//             "assessment_id"
//           )

//           .populate(
//             "exam_id"
//           )

//           .populate(
//             "subject_id"
//           )

//           .populate(
//             "chapter_id"
//           )

//           .populate(
//             "topic_id"
//           );

//       }



//       // ======================================
//       // RESPONSE
//       // ======================================

//       res.status(200).json({

//         success: true,



//         message:
//           req.params.id

//             ? "Question updated successfully"

//             : "Question created successfully",



//         question,

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



// // ======================================
// // GET ALL QUESTIONS
// // ======================================

// exports.fetchQuestions =
//   async (req, res) => {

//     try {

//       const questions =
//         await Question.find({

//           is_deleted: false,

//         })

//         .populate(
//           "assessment_id"
//         )

//         .populate(
//           "exam_id"
//         )

//         .populate(
//           "subject_id"
//         )

//         .populate(
//           "chapter_id"
//         )

//         .populate(
//           "topic_id"
//         )

//         .sort({

//           createdAt: -1,

//         });



//       res.status(200).json({

//         success: true,



//         count:
//           questions.length,



//         questions,

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



// // ======================================
// // GET SINGLE QUESTION
// // ======================================

// exports.fetchSingleQuestion =
//   async (req, res) => {

//     try {

//       const question =
//         await Question.findById(

//           req.params.id

//         )

//         .populate(
//           "assessment_id"
//         )

//         .populate(
//           "exam_id"
//         )

//         .populate(
//           "subject_id"
//         )

//         .populate(
//           "chapter_id"
//         )

//         .populate(
//           "topic_id"
//         );



//       if (!question) {

//         return res.status(404).json({

//           success: false,



//           message:
//             "Question not found",

//         });

//       }



//       res.status(200).json({

//         success: true,



//         question,

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



// // ======================================
// // GET QUESTIONS BY ASSESSMENT
// // ======================================

// exports.fetchQuestionsForAssessment =
//   async (req, res) => {

//     try {

//       const questions =
//         await Question.find({

//           assessment_id:
//             req.params.assessmentId,



//           is_deleted:
//             false,

//         })

//         .populate(
//           "assessment_id"
//         )

//         .populate(
//           "exam_id"
//         )

//         .populate(
//           "subject_id"
//         )

//         .populate(
//           "chapter_id"
//         )

//         .populate(
//           "topic_id"
//         )

//         .sort({

//           createdAt: -1,

//         });



//       res.status(200).json({

//         success: true,



//         count:
//           questions.length,



//         questions,

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



// // ======================================
// // DELETE QUESTION
// // ======================================

// exports.softDeleteQuestion =
//   async (req, res) => {

//     try {

//       const question =
//         await Question.findByIdAndUpdate(

//           req.params.id,

//           {

//             is_deleted: true,

//           },

//           {

//             returnDocument:
//               "after",

//           }

//         );



//       if (!question) {

//         return res.status(404).json({

//           success: false,



//           message:
//             "Question not found",

//         });

//       }



//       // ======================================
//       // AUTO DECREASE QUESTION COUNT
//       // ======================================

//       await Assessment.findByIdAndUpdate(

//         question.assessment_id,

//         {

//           $inc: {

//             total_questions: -1,

//           },

//         }

//       );



//       res.status(200).json({

//         success: true,



//         message:
//           "Question deleted successfully",

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


const Question = require("../models/Question");
const Assessment = require("../models/Assessment");

// ======================================
// CREATE / UPDATE QUESTION
// ======================================
exports.upsertQuestion = async (req, res) => {
  try {
    let question;

    // UPDATE
    if (req.params.id) {
      const updateData = {};

      // Sirf wahi fields update karo jo body mein aayi hain
      if (req.body.assessment_id !== undefined) updateData.assessment_id = req.body.assessment_id || null;
      if (req.body.exam_id       !== undefined) updateData.exam_id       = req.body.exam_id || null;
      if (req.body.subject_id    !== undefined) updateData.subject_id    = req.body.subject_id || null;
      if (req.body.chapter_id    !== undefined) updateData.chapter_id    = req.body.chapter_id || null;
      if (req.body.topic_id      !== undefined) updateData.topic_id      = req.body.topic_id || null;
      if (req.body.question_text         !== undefined) updateData.question_text         = req.body.question_text;
      if (req.body.question_image_url    !== undefined) updateData.question_image_url    = req.body.question_image_url || null;
      if (req.body.options               !== undefined) updateData.options               = req.body.options;
      if (req.body.correct_answer        !== undefined) updateData.correct_answer        = req.body.correct_answer;
      if (req.body.explanation           !== undefined) updateData.explanation           = req.body.explanation || null;
      if (req.body.explanation_image_url !== undefined) updateData.explanation_image_url = req.body.explanation_image_url || null;
      if (req.body.marks                 !== undefined) updateData.marks                 = req.body.marks;
      if (req.body.negative_marks        !== undefined) updateData.negative_marks        = req.body.negative_marks;
      if (req.body.difficulty            !== undefined) updateData.difficulty            = req.body.difficulty;

      question = await Question.findByIdAndUpdate(
        req.params.id,
        { $set: updateData },  // ← $set: sirf yahi fields update hongi, baaki safe
        { new: true }
      )
        .populate("assessment_id")
        .populate("exam_id")
        .populate("subject_id")
        .populate("chapter_id")
        .populate("topic_id");

      if (!question) {
        return res.status(404).json({ success: false, message: "Question not found" });
      }
    }

    // CREATE
    else {
      question = await Question.create({
        assessment_id:         req.body.assessment_id || null,  // null allowed
        exam_id:               req.body.exam_id || null,
        subject_id:            req.body.subject_id || null,
        chapter_id:            req.body.chapter_id || null,
        topic_id:              req.body.topic_id || null,
        question_text:         req.body.question_text,
        question_image_url:    req.body.question_image_url || null,
        options:               req.body.options,
        correct_answer:        req.body.correct_answer,
        explanation:           req.body.explanation || null,
        explanation_image_url: req.body.explanation_image_url || null,
        marks:                 req.body.marks,
        negative_marks:        req.body.negative_marks,
        difficulty:            req.body.difficulty,
      });

      // Count sirf tab badhao jab assessment linked ho
      if (req.body.assessment_id) {
        await Assessment.findByIdAndUpdate(req.body.assessment_id, {
          $inc: { total_questions: 1 },
        });
      }

      question = await Question.findById(question._id)
        .populate("assessment_id")
        .populate("exam_id")
        .populate("subject_id")
        .populate("chapter_id")
        .populate("topic_id");
    }

    res.status(200).json({
      success: true,
      message: req.params.id ? "Question updated successfully" : "Question created successfully",
      question,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ======================================
// GET ALL QUESTIONS
// ======================================
exports.fetchQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ is_deleted: false })
      .populate("assessment_id")
      .populate("exam_id")
      .populate("subject_id")
      .populate("chapter_id")
      .populate("topic_id")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: questions.length, questions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ======================================
// GET SINGLE QUESTION
// ======================================
exports.fetchSingleQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate("assessment_id")
      .populate("exam_id")
      .populate("subject_id")
      .populate("chapter_id")
      .populate("topic_id");

    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    res.status(200).json({ success: true, question });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ======================================
// GET QUESTIONS BY ASSESSMENT
// ======================================
exports.fetchQuestionsForAssessment = async (req, res) => {
  try {
    const questions = await Question.find({
      assessment_id: req.params.assessmentId,
      is_deleted: false,
    })
      .populate("assessment_id")
      .populate("exam_id")
      .populate("subject_id")
      .populate("chapter_id")
      .populate("topic_id")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: questions.length, questions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ======================================
// DELETE QUESTION
// ======================================
exports.softDeleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { is_deleted: true },
      { new: true }
    );

    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    if (question.assessment_id) {
      await Assessment.findByIdAndUpdate(question.assessment_id, {
        $inc: { total_questions: -1 },
      });
    }

    res.status(200).json({ success: true, message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};