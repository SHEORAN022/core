const Test =
  require("../models/Test");

const Exam =
  require("../models/Exam");

const Teacher =
  require("../models/Teacher");

// ===============================
// CREATE TEST
// ===============================

exports.createTest =
  async (req, res) => {

    try {

      const {

        exam,
        teacher,
        title,
        duration,
        status,

      } = req.body;

      // ===============================
      // CHECK EXAM
      // ===============================

      const examData =
        await Exam.findById(exam);

      if (!examData) {

        return res.status(404).json({
          success: false,
          message: "Exam not found",
        });

      }

      // ===============================
      // CHECK TEACHER
      // ===============================

      const teacherData =
        await Teacher.findById(teacher);

      if (!teacherData) {

        return res.status(404).json({
          success: false,
          message: "Teacher not found",
        });

      }

      // ===============================
      // CREATE TEST
      // ===============================

      const test =
        await Test.create({

          exam,

          teacher,

          title,

          subject:
            teacherData.name,

          duration,

          category:
            examData.name,

          imagePath:
            examData.image,

          status,

        });

      res.status(201).json({

        success: true,

        message:
          "Test created successfully",

        test,

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
// GET ALL TESTS
// ===============================

exports.getAllTests =
  async (req, res) => {

    try {

      const tests =
        await Test.find()

          .populate("exam")
          .populate("teacher")

          .sort({ createdAt: -1 });

      res.status(200).json({

        success: true,

        total:
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

// ===============================
// GET SINGLE TEST
// ===============================

exports.getSingleTest =
  async (req, res) => {

    try {

      const test =
        await Test.findById(
          req.params.id
        )

          .populate("exam")
          .populate("teacher");

      if (!test) {

        return res.status(404).json({

          success: false,

          message:
            "Test not found",

        });

      }

      res.status(200).json({

        success: true,

        test,

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
// UPDATE TEST
// ===============================

exports.updateTest =
  async (req, res) => {

    try {

      const updated =
        await Test.findByIdAndUpdate(

          req.params.id,

          req.body,

          { new: true }

        );

      if (!updated) {

        return res.status(404).json({

          success: false,

          message:
            "Test not found",

        });

      }

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

// ===============================
// DELETE TEST
// ===============================

exports.deleteTest =
  async (req, res) => {

    try {

      const deleted =
        await Test.findByIdAndDelete(
          req.params.id
        );

      if (!deleted) {

        return res.status(404).json({

          success: false,

          message:
            "Test not found",

        });

      }

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