
// const Test =
//   require("../models/Test");

// const Exam =
//   require("../models/Exam");

// const Teacher =
//   require("../models/Teacher");

// const Category =
//   require("../models/Category");

// const Question =
//   require("../models/Question");

// // ======================================
// // CREATE TEST
// // ======================================

// exports.createTest =
//   async (req, res) => {

//     try {

//       const {

//         exam,
//         teacher,
//         category,
//         title,
//         duration,
//         instructions,
//         status,

//       } = req.body;

//       // ======================================
//       // VALIDATION
//       // ======================================

//       if (

//         !exam ||

//         !teacher ||

//         !category ||

//         !title

//       ) {

//         return res.status(400).json({

//           success: false,

//           message:
//             "Please fill all required fields",

//         });

//       }

//       // ======================================
//       // CHECK EXAM
//       // ======================================

//       const examData =
//         await Exam.findById(
//           exam
//         );

//       if (!examData) {

//         return res.status(404).json({

//           success: false,

//           message:
//             "Exam not found",

//         });

//       }

//       // ======================================
//       // CHECK TEACHER
//       // ======================================

//       const teacherData =
//         await Teacher.findById(
//           teacher
//         );

//       if (!teacherData) {

//         return res.status(404).json({

//           success: false,

//           message:
//             "Teacher not found",

//         });

//       }

//       // ======================================
//       // CHECK CATEGORY
//       // ======================================

//       const categoryData =
//         await Category.findById(
//           category
//         );

//       if (!categoryData) {

//         return res.status(404).json({

//           success: false,

//           message:
//             "Category not found",

//         });

//       }

//       // ======================================
//       // CREATE TEST
//       // ======================================

//       const test =
//         await Test.create({

//           exam,

//           teacher,

//           category,

//           title,

//           subject:
//             teacherData.teacherName,

//           duration,

//           instructions,

//           imagePath:
//             examData.image,

//           status,

//         });

//       // ======================================
//       // GET FULL TEST
//       // ======================================

//       const fullTest =
//         await Test.findById(
//           test._id
//         )

//           .populate("exam")

//           .populate("teacher")

//           .populate("category");

//       // ======================================
//       // RESPONSE
//       // ======================================

//       res.status(201).json({

//         success: true,

//         message:
//           "Test created successfully",

//         test:
//           fullTest,

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
// // GET ALL TESTS
// // ======================================

// exports.getAllTests =
//   async (req, res) => {

//     try {

//       // ======================================
//       // GET TESTS
//       // ======================================

//       const tests =
//         await Test.find()

//           .populate("exam")

//           .populate("teacher")

//           .populate("category")

//           .sort({
//             createdAt: -1,
//           });

//       // ======================================
//       // ADD QUESTIONS IN EVERY TEST
//       // ======================================

//       const updatedTests =
//         await Promise.all(

//           tests.map(
//             async (test) => {

//               // ==========================
//               // GET QUESTIONS
//               // ==========================

//               const questions =
//                 await Question.find({

//                   test:
//                     test._id,

//                 })

//                   .sort({

//                     createdAt: 1,

//                   });

//               // ==========================
//               // RETURN TEST + QUESTIONS
//               // ==========================

//               return {

//                 ...test.toObject(),

//                 questions,

//               };

//             }
//           )

//         );

//       // ======================================
//       // RESPONSE
//       // ======================================

//       res.status(200).json({

//         success: true,

//         total:
//           updatedTests.length,

//         tests:
//           updatedTests,

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
// // GET SINGLE TEST
// // ======================================

// exports.getSingleTest =
//   async (req, res) => {

//     try {

//       // ======================================
//       // GET TEST
//       // ======================================

//       const test =
//         await Test.findById(
//           req.params.id
//         )

//           .populate("exam")

//           .populate("teacher")

//           .populate("category");

//       // ======================================
//       // CHECK TEST
//       // ======================================

//       if (!test) {

//         return res.status(404).json({

//           success: false,

//           message:
//             "Test not found",

//         });

//       }

//       // ======================================
//       // GET QUESTIONS
//       // ======================================

//       const questions =
//         await Question.find({

//           test:
//             test._id,

//         })

//           .sort({

//             createdAt: 1,

//           });

//       // ======================================
//       // RESPONSE
//       // ======================================

//       res.status(200).json({

//         success: true,

//         test,

//         totalQuestions:
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
// // UPDATE TEST
// // ======================================

// exports.updateTest =
//   async (req, res) => {

//     try {

//       const updated =
//         await Test.findByIdAndUpdate(

//           req.params.id,

//           req.body,

//           {

//             new: true,

//             runValidators: true,

//           }

//         )

//           .populate("exam")

//           .populate("teacher")

//           .populate("category");

//       // ======================================
//       // CHECK TEST
//       // ======================================

//       if (!updated) {

//         return res.status(404).json({

//           success: false,

//           message:
//             "Test not found",

//         });

//       }

//       // ======================================
//       // RESPONSE
//       // ======================================

//       res.status(200).json({

//         success: true,

//         message:
//           "Test updated successfully",

//         test:
//           updated,

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
// // DELETE TEST
// // ======================================

// exports.deleteTest =
//   async (req, res) => {

//     try {

//       const deleted =
//         await Test.findByIdAndDelete(
//           req.params.id
//         );

//       // ======================================
//       // CHECK TEST
//       // ======================================

//       if (!deleted) {

//         return res.status(404).json({

//           success: false,

//           message:
//             "Test not found",

//         });

//       }

//       // ======================================
//       // DELETE QUESTIONS ALSO
//       // ======================================

//       await Question.deleteMany({

//         test:
//           req.params.id,

//       });

//       // ======================================
//       // RESPONSE
//       // ======================================

//       res.status(200).json({

//         success: true,

//         message:
//           "Test deleted successfully",

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

const Test =
  require("../models/Test");

const Exam =
  require("../models/Exam");

const Teacher =
  require("../models/Teacher");

const Category =
  require("../models/Category");

const Question =
  require("../models/Question");

// ======================================
// CREATE TEST
// ======================================

exports.createTest =
  async (req, res) => {

    try {

      const {

  exam,
  teacher,
  category,
  title,
  duration,

  startDateTime,
  endDateTime,

  instructions,
  status,

} = req.body;

      // ======================================
      // VALIDATION
      // ======================================

      if (

        !exam ||

        !teacher ||

        !category ||

        !title

      ) {

        return res.status(400).json({

          success: false,

          message:
            "Please fill all required fields",

        });

      }

      // ======================================
      // CHECK EXAM
      // ======================================

      const examData =
        await Exam.findById(
          exam
        );

      if (!examData) {

        return res.status(404).json({

          success: false,

          message:
            "Exam not found",

        });

      }

      // ======================================
      // CHECK TEACHER
      // ======================================

      const teacherData =
        await Teacher.findById(
          teacher
        );

      if (!teacherData) {

        return res.status(404).json({

          success: false,

          message:
            "Teacher not found",

        });

      }

      // ======================================
      // CHECK CATEGORY
      // ======================================

      const categoryData =
        await Category.findById(
          category
        );

      if (!categoryData) {

        return res.status(404).json({

          success: false,

          message:
            "Category not found",

        });

      }

      // ======================================
      // CREATE TEST
      // ======================================

      const test =
        await Test.create({

          exam,

          teacher,

          category,

          title,

          subject:
            teacherData.teacherName,

        duration,

startDateTime,
endDateTime,

instructions,

imagePath:
  examData.image,

status,

        });

      // ======================================
      // GET FULL TEST
      // ======================================

      const fullTest =
        await Test.findById(
          test._id
        )

          .populate("exam")

          .populate("teacher")

          .populate("category");

      // ======================================
      // RESPONSE
      // ======================================

      res.status(201).json({

        success: true,

        message:
          "Test created successfully",

        test:
          fullTest,

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
// GET ALL TESTS
// ======================================

exports.getAllTests =
  async (req, res) => {

    try {

      // ======================================
      // GET TESTS
      // ======================================

      const tests =
        await Test.find()

          .populate("exam")

          .populate("teacher")

          .populate("category")

          .sort({
            createdAt: -1,
          });

      // ======================================
      // ADD QUESTIONS IN EVERY TEST
      // ======================================

      const updatedTests =
        await Promise.all(

          tests.map(
            async (test) => {

              // ==========================
              // GET QUESTIONS
              // ==========================

              const questions =
                await Question.find({

                  test:
                    test._id,

                })

                  .sort({

                    createdAt: 1,

                  });

              // ==========================
              // RETURN TEST + QUESTIONS
              // ==========================

              return {

                ...test.toObject(),

                questions,

              };

            }
          )

        );

      // ======================================
      // RESPONSE
      // ======================================

      res.status(200).json({

        success: true,

        total:
          updatedTests.length,

        tests:
          updatedTests,

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
// GET SINGLE TEST
// ======================================

exports.getSingleTest =
  async (req, res) => {

    try {

      // ======================================
      // GET TEST
      // ======================================

      const test =
        await Test.findById(
          req.params.id
        )

          .populate("exam")

          .populate("teacher")

          .populate("category");

      // ======================================
      // CHECK TEST
      // ======================================

      if (!test) {

        return res.status(404).json({

          success: false,

          message:
            "Test not found",

        });

      }

      // ======================================
      // GET QUESTIONS
      // ======================================

      const questions =
        await Question.find({

          test:
            test._id,

        })

          .sort({

            createdAt: 1,

          });

      // ======================================
      // RESPONSE
      // ======================================

      res.status(200).json({

        success: true,

        test,

        totalQuestions:
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

// ======================================
// UPDATE TEST
// ======================================

exports.updateTest =
  async (req, res) => {

    try {

      const updated =
        await Test.findByIdAndUpdate(

          req.params.id,

          req.body,

          {

            new: true,

            runValidators: true,

          }

        )

          .populate("exam")

          .populate("teacher")

          .populate("category");

      // ======================================
      // CHECK TEST
      // ======================================

      if (!updated) {

        return res.status(404).json({

          success: false,

          message:
            "Test not found",

        });

      }

      // ======================================
      // RESPONSE
      // ======================================

      res.status(200).json({

        success: true,

        message:
          "Test updated successfully",

        test:
          updated,

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
// DELETE TEST
// ======================================

exports.deleteTest =
  async (req, res) => {

    try {

      const deleted =
        await Test.findByIdAndDelete(
          req.params.id
        );

      // ======================================
      // CHECK TEST
      // ======================================

      if (!deleted) {

        return res.status(404).json({

          success: false,

          message:
            "Test not found",

        });

      }

      // ======================================
      // DELETE QUESTIONS ALSO
      // ======================================

      await Question.deleteMany({

        test:
          req.params.id,

      });

      // ======================================
      // RESPONSE
      // ======================================

      res.status(200).json({

        success: true,

        message:
          "Test deleted successfully",

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