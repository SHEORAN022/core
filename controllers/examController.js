const Exam = require("../models/examModel");

exports.createExam = async (req, res) => {
  try {
    const exam = await Exam.create(req.body);

    res.status(201).json({
      success: true,
      exam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find({
      isDeleted: false,
    });

    res.json({
      success: true,
      exams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE EXAM

exports.deleteExam =
  async (req, res) => {

    try {

      const exam =
        await Exam.findByIdAndUpdate(

          req.params.id,

          {
            isDeleted: true,
          },

          {
            new: true,
          }

        );

      if (!exam) {

        return res.status(404).json({

          success: false,

          message:
            "Exam not found",

        });

      }

      res.status(200).json({

        success: true,

        message:
          "Exam deleted successfully",

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

  // UPDATE EXAM

exports.updateExam =
  async (req, res) => {

    try {

      const exam =
        await Exam.findByIdAndUpdate(

          req.params.id,

          {
            name: req.body.name,
          },

          {
            new: true,
          }

        );

      if (!exam) {

        return res.status(404).json({

          success: false,

          message:
            "Exam not found",

        });

      }

      res.status(200).json({

        success: true,

        message:
          "Exam updated successfully",

        exam,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };