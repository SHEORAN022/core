// const Teacher = require("../models/teacherModel");

// exports.createTeacher = async (req, res) => {
//   try {
//     const teacher = await Teacher.create(req.body);

//     res.status(201).json({
//       success: true,
//       teacher,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// exports.getTeachers = async (req, res) => {
//   try {
//     const teachers = await Teacher.find();

//     res.json({
//       success: true,
//       teachers,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


const Teacher =
  require("../models/teacherModel");



// ======================================
// CREATE TEACHER
// ======================================

exports.createTeacher =
  async (req, res) => {

    try {

      const {

        teacherName,
        email,
        subjects,
        bio,
        profile_image,
        experience,
        qualification,

      } = req.body;



      // ======================================
      // VALIDATION
      // ======================================

      if (!teacherName) {

        return res.status(400).json({

          success: false,

          message:
            "Teacher name is required",

        });

      }

      if (!email) {

        return res.status(400).json({

          success: false,

          message:
            "Email is required",

        });

      }



      // ======================================
      // CHECK EXISTING
      // ======================================

      const existingTeacher =
        await Teacher.findOne({

          email,

        });

      if (existingTeacher) {

        return res.status(400).json({

          success: false,

          message:
            "Teacher already exists",

        });

      }



      // ======================================
      // CREATE
      // ======================================

      const teacher =
        await Teacher.create({

          teacherName,

          email,

          // subjects,
          subjects: subjects || [],

          bio,

          profile_image,

          experience,

          qualification,

        });



      res.status(201).json({

        success: true,

        message:
          "Teacher created successfully",

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



// ======================================
// GET ALL TEACHERS
// ======================================

exports.getTeachers =
  async (req, res) => {

    try {

      const teachers =
        await Teacher.find({

          is_active: true,

        })

        .populate("subjects")

        .sort({
          createdAt: -1,
        });



      res.status(200).json({

        success: true,

        count:
          teachers.length,

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



// ======================================
// GET SINGLE TEACHER
// ======================================

exports.getSingleTeacher =
  async (req, res) => {

    try {

      const teacher =
        await Teacher.findById(

          req.params.id

        )

        .populate("subjects");



      if (!teacher) {

        return res.status(404).json({

          success: false,

          message:
            "Teacher not found",

        });

      }



      res.status(200).json({

        success: true,

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



// ======================================
// UPDATE TEACHER
// ======================================

exports.updateTeacher =
  async (req, res) => {

    try {

      const teacher =
        await Teacher.findByIdAndUpdate(

          req.params.id,

          req.body,

          {

            returnDocument:
              "after",

          }

        )

        .populate("subjects");



      if (!teacher) {

        return res.status(404).json({

          success: false,

          message:
            "Teacher not found",

        });

      }



      res.status(200).json({

        success: true,

        message:
          "Teacher updated successfully",

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



// ======================================
// DELETE TEACHER
// ======================================

exports.deleteTeacher =
  async (req, res) => {

    try {

      const teacher =
        await Teacher.findByIdAndUpdate(

          req.params.id,

          {

            is_active: false,

          },

          {

            returnDocument:
              "after",

          }

        );



      if (!teacher) {

        return res.status(404).json({

          success: false,

          message:
            "Teacher not found",

        });

      }



      res.status(200).json({

        success: true,

        message:
          "Teacher deleted successfully",

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
