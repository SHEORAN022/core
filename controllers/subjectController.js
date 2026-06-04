// // const Subject = require("../models/subjectModel");

// // exports.createSubject = async (req, res) => {
// //   try {
// //     const subject = await Subject.create(req.body);

// //     res.status(201).json({
// //       success: true,
// //       subject,
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// // exports.getSubjectsByExam = async (req, res) => {
// //   try {
// //     const subjects = await Subject.find({
// //       examId: req.params.examId,
// //       isDeleted: false,
// //     });

// //     res.json({
// //       success: true,
// //       subjects,
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };


// const Subject =
//   require("../models/subjectModel");

// const Chapter =
//   require("../models/chapterModel");

// const Topic =
//   require("../models/topicModel");

// const Reel =
//   require("../models/Reel");

// const Assessment =
//   require("../models/Assessment");



// // ======================================
// // CREATE SUBJECT
// // ======================================

// exports.createSubject =
//   async (req, res) => {

//     try {

//       const subject =
//         await Subject.create(
//           req.body
//         );

//       res.status(201).json({

//         success: true,

//         subject,

//       });

//     } catch (error) {

//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }
//   };



// // ======================================
// // GET SUBJECTS BY EXAM
// // ======================================

// exports.getSubjectsByExam =
//   async (req, res) => {

//     try {

//       // ======================================
//       // GET SUBJECTS
//       // ======================================

//       const subjects =
//         await Subject.find({

//           examId:
//             req.params.examId,

//           isDeleted: false,

//         });



//       // ======================================
//       // FULL SUBJECT DATA
//       // ======================================

//       const finalSubjects =
//         await Promise.all(

//           subjects.map(
//             async (subject) => {

//               // ======================================
//               // CHAPTERS
//               // ======================================

//               const chapters =
//                 await Chapter.find({

//                   subjectId:
//                     subject._id,

//                   isDeleted:
//                     false,

//                 });



//               const chapterIds =
//                 chapters.map(
//                   (chapter) =>
//                     chapter._id
//                 );



//               // ======================================
//               // TOPICS
//               // ======================================

//               const topics =
//                 await Topic.find({

//                   chapterId: {
//                     $in:
//                       chapterIds,
//                   },

//                   isDeleted:
//                     false,

//                 });



//               const topicIds =
//                 topics.map(
//                   (topic) =>
//                     topic._id
//                 );



//               // ======================================
//               // REELS
//               // ======================================

//               const reels =
//                 await Reel.find({

//                   topicId: {
//                     $in:
//                       topicIds,
//                   },

//                   status:
//                     "published",

//                 })

//                 .populate(
//                   "teacherId"
//                 )

//                 .sort({

//                   createdAt: -1,

//                 });



//               // ======================================
//               // TEST SERIES
//               // ======================================

//               const tests =
//                 await Assessment.find({

//                   subject_id:
//                     subject._id,

//                   is_deleted:
//                     false,

//                 }).sort({

//                   createdAt: -1,

//                 });



//               // ======================================
//               // RETURN
//               // ======================================

//               return {

//                 ...subject.toObject(),

//                 chapters,

//                 topics,

//                 reels,

//                 tests,

//               };
//             }
//           )
//         );



//       // ======================================
//       // RESPONSE
//       // ======================================

//       res.status(200).json({

//         success: true,

//         count:
//           finalSubjects.length,

//         subjects:
//           finalSubjects,

//       });

//     } catch (error) {

//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }
//   };

const Subject =
  require("../models/subjectModel");

const Chapter =
  require("../models/chapterModel");

const Topic =
  require("../models/topicModel");

const Reel =
  require("../models/Reel");

const Assessment =
  require("../models/Assessment");



// ======================================
// CREATE SUBJECT
// ======================================

exports.createSubject =
  async (req, res) => {

    try {

      const {

        examId,
        name,

      } = req.body;

      if (!examId) {

        return res.status(400).json({

          success: false,
          message:
            "Exam ID required",

        });

      }

      if (!name) {

        return res.status(400).json({

          success: false,
          message:
            "Subject name required",

        });

      }

      const subject =
        await Subject.create({

          examId,
          name,

        });

      res.status(201).json({

        success: true,
        message:
          "Subject created successfully",

        subject,

      });

    } catch (error) {

      res.status(500).json({

        success: false,
        message:
          error.message,

      });

    }

  };



// ======================================
// GET SUBJECTS BY EXAM
// ======================================

exports.getSubjectsByExam =
  async (req, res) => {

    try {

      const subjects =
        await Subject.find({

          examId:
            req.params.examId,

          isDeleted: false,

        })

        .sort({
          createdAt: -1,
        });

      const finalSubjects =
        await Promise.all(

          subjects.map(
            async (subject) => {

              // CHAPTERS

              const chapters =
                await Chapter.find({

                  subjectId:
                    subject._id,

                  isDeleted:
                    false,

                });

              const chapterIds =
                chapters.map(
                  (chapter) =>
                    chapter._id
                );

              // TOPICS

              const topics =
                await Topic.find({

                  chapterId: {
                    $in:
                      chapterIds,
                  },

                  isDeleted:
                    false,

                });

              const topicIds =
                topics.map(
                  (topic) =>
                    topic._id
                );

              // REELS

              const reels =
                await Reel.find({

                  topic_id: {
                    $in:
                      topicIds,
                  },

                  is_active:
                    true,

                })

                .populate(
                  "teacher_id"
                )

                .sort({

                  createdAt: -1,

                });

              // TESTS

              const tests =
                await Assessment.find({

                  subject_id:
                    subject._id,

                  is_deleted:
                    false,

                })

                .sort({
                  createdAt: -1,
                });

              return {

                ...subject.toObject(),

                chapters,

                topics,

                reels,

                tests,

              };

            }
          )
        );

      res.status(200).json({

        success: true,

        count:
          finalSubjects.length,

        subjects:
          finalSubjects,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };



// ======================================
// GET SINGLE SUBJECT
// ======================================

exports.getSingleSubject =
  async (req, res) => {

    try {

      const subject =
        await Subject.findById(
          req.params.id
        );

      if (!subject) {

        return res.status(404).json({

          success: false,

          message:
            "Subject not found",

        });

      }

      res.status(200).json({

        success: true,

        subject,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };



// ======================================
// UPDATE SUBJECT
// ======================================

exports.updateSubject =
  async (req, res) => {

    try {

      const subject =
        await Subject.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }

        );

      if (!subject) {

        return res.status(404).json({

          success: false,

          message:
            "Subject not found",

        });

      }

      res.status(200).json({

        success: true,

        message:
          "Subject updated successfully",

        subject,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };



// ======================================
// DELETE SUBJECT
// ======================================

exports.deleteSubject =
  async (req, res) => {

    try {

      const subject =
        await Subject.findByIdAndUpdate(

          req.params.id,

          {
            isDeleted: true,
          },

          {
            new: true,
          }

        );

      if (!subject) {

        return res.status(404).json({

          success: false,

          message:
            "Subject not found",

        });

      }

      res.status(200).json({

        success: true,

        message:
          "Subject deleted successfully",

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };