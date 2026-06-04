const User =
  require("../models/User");

const Exam =
  require("../models/Exam");

const jwt =
  require("jsonwebtoken");

// =====================================
// SELECT EXAM
// =====================================

exports.selectExam =
  async (req, res) => {

    try {

      const { examId } =
        req.body;

      // ======================
      // CHECK EXAM
      // ======================

      const exam =
        await Exam.findById(
          examId
        );

      if (!exam) {

        return res.status(404).json({

          success: false,

          message:
            "Exam not found",

        });

      }

      // ======================
      // SAVE IN USER
      // ======================

      const user =
        await User.findByIdAndUpdate(

          req.user._id,

          {

            selectedExam:
              exam._id,

          },

          {

            new: true,

          }

        );

      // ======================
      // NEW TOKEN
      // ======================

      const token =
        jwt.sign(

          {

            id:
              user._id,

            role:
              user.role,

            selectedExam:
              user.selectedExam,

          },

          process.env.JWT_SECRET,

          {

            expiresIn:
              "30d",

          }

        );

      // ======================
      // RESPONSE
      // ======================

      res.status(200).json({

        success: true,

        message:
          "Exam selected successfully",

        token,

        selectedExam:
          exam,

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