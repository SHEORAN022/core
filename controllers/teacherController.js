// const Teacher =
//   require("../models/Teacher");

// // =================================
// // CREATE TEACHER
// // =================================

// exports.createTeacher =
//   async (req, res) => {

//     try {

//       const teacher =
//         await Teacher.create({

//           teacherName:
//             req.body.teacherName,

//           email:
//             req.body.email,

//           phone:
//             req.body.phone,

//           profileImage:
//             req.body.profileImage,

//           qualification:
//             req.body.qualification,

//           experience:
//             req.body.experience,

//           description:
//             req.body.description,

//           subjects:
//             req.body.subjects,

//           status:
//             req.body.status,

//         });

//       res.status(201).json({

//         success: true,

//         message:
//           "Teacher Added Successfully",

//         data:
//           teacher,

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
// // GET ALL TEACHERS
// // =================================

// exports.getTeachers =
//   async (req, res) => {

//     try {

//       const teachers =
//         await Teacher.find()

//           .sort({
//             createdAt: -1,
//           });

//       res.status(200).json({

//         success: true,

//         total:
//           teachers.length,

//         data:
//           teachers,

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
// // GET SINGLE TEACHER
// // =================================

// exports.getSingleTeacher =
//   async (req, res) => {

//     try {

//       const teacher =
//         await Teacher.findById(
//           req.params.id
//         );

//       if (!teacher) {

//         return res.status(404).json({

//           success: false,

//           message:
//             "Teacher Not Found",

//         });

//       }

//       res.status(200).json({

//         success: true,

//         data:
//           teacher,

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
// // UPDATE TEACHER
// // =================================

// exports.updateTeacher =
//   async (req, res) => {

//     try {

//       const teacher =
//         await Teacher.findByIdAndUpdate(

//           req.params.id,

//           req.body,

//           {
//             new: true,
//           }

//         );

//       if (!teacher) {

//         return res.status(404).json({

//           success: false,

//           message:
//             "Teacher Not Found",

//         });

//       }

//       res.status(200).json({

//         success: true,

//         message:
//           "Teacher Updated Successfully",

//         data:
//           teacher,

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
// // DELETE TEACHER
// // =================================

// exports.deleteTeacher =
//   async (req, res) => {

//     try {

//       const teacher =
//         await Teacher.findByIdAndDelete(
//           req.params.id
//         );

//       if (!teacher) {

//         return res.status(404).json({

//           success: false,

//           message:
//             "Teacher Not Found",

//         });

//       }

//       res.status(200).json({

//         success: true,

//         message:
//           "Teacher Deleted Successfully",

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

const Teacher =
  require("../models/Teacher");

// =================================
// CREATE TEACHER
// =================================

exports.createTeacher =
  async (req, res) => {

    try {

      const {

        teacherName,
        email,
        phone,
        profileImage,
        qualification,
        experience,
        description,
        subjects,
        status,

      } = req.body;

      // ======================
      // VALIDATION
      // ======================

      if (!teacherName) {

        return res.status(400).json({

          success: false,

          message:
            "Teacher name is required",

        });

      }

      // ======================
      // CREATE TEACHER
      // ======================

      const teacher =
        await Teacher.create({

          teacherName,

          email,

          phone,

          profileImage,

          qualification,

          experience,

          description,

          subjects,

          status,

        });

      // ======================
      // RESPONSE
      // ======================

      res.status(201).json({

        success: true,

        message:
          "Teacher Added Successfully",

        data:
          teacher,

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
// GET ALL TEACHERS
// =================================

exports.getTeachers =
  async (req, res) => {

    try {

      const teachers =
        await Teacher.find()

          .populate({

            path: "reels",

            options: {
              sort: {
                createdAt: -1,
              },
            },

          })

          .sort({
            createdAt: -1,
          });

      // ======================
      // RESPONSE
      // ======================

      res.status(200).json({

        success: true,

        total:
          teachers.length,

        data:
          teachers,

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
// GET SINGLE TEACHER
// =================================

exports.getSingleTeacher =
  async (req, res) => {

    try {

      const teacher =
        await Teacher.findById(
          req.params.id
        )

          .populate({

            path: "reels",

            options: {
              sort: {
                createdAt: -1,
              },
            },

          });

      // ======================
      // CHECK TEACHER
      // ======================

      if (!teacher) {

        return res.status(404).json({

          success: false,

          message:
            "Teacher Not Found",

        });

      }

      // ======================
      // RESPONSE
      // ======================

      res.status(200).json({

        success: true,

        data:
          teacher,

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
// UPDATE TEACHER
// =================================

exports.updateTeacher =
  async (req, res) => {

    try {

      const teacher =
        await Teacher.findByIdAndUpdate(

          req.params.id,

          req.body,

          {

            new: true,

            runValidators: true,

          }

        )

          .populate({

            path: "reels",

          });

      // ======================
      // CHECK TEACHER
      // ======================

      if (!teacher) {

        return res.status(404).json({

          success: false,

          message:
            "Teacher Not Found",

        });

      }

      // ======================
      // RESPONSE
      // ======================

      res.status(200).json({

        success: true,

        message:
          "Teacher Updated Successfully",

        data:
          teacher,

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
// DELETE TEACHER
// =================================

exports.deleteTeacher =
  async (req, res) => {

    try {

      const teacher =
        await Teacher.findByIdAndDelete(
          req.params.id
        );

      // ======================
      // CHECK TEACHER
      // ======================

      if (!teacher) {

        return res.status(404).json({

          success: false,

          message:
            "Teacher Not Found",

        });

      }

      // ======================
      // RESPONSE
      // ======================

      res.status(200).json({

        success: true,

        message:
          "Teacher Deleted Successfully",

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