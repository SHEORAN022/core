


const jwt =
  require("jsonwebtoken");

const User =
  require("../models/User");

const Exam =
  require("../models/Exam");

// =====================================
// SAVE USER SELECTION
// =====================================

exports.saveUserSelection =
  async (req, res) => {

    try {

      const {

        selectedClass,

        examId,

      } = req.body;

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
      // UPDATE USER
      // ======================

      const user =
        await User.findByIdAndUpdate(

          req.user._id,

          {

            selectedClass,

            selectedExamId:
              exam._id,

            selectedExamName:
              exam.name,

            isLoggedIn:
              true,

          },

          {
            new: true,
          }

        );

      // ======================
      // NEW JWT TOKEN
      // ======================

      const token =
        jwt.sign(

          {

            id:
              user._id,

            role:
              user.role,

            selectedExamId:
              user.selectedExamId,

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
          "Selection saved successfully",

        token,

        user: {

          _id:
            user._id,

          name:
            user.name,

          email:
            user.email,

          profilePic:
            user.profilePic,

          selectedClass:
            user.selectedClass,

          selectedExamId:
            user.selectedExamId,

          selectedExamName:
            user.selectedExamName,

          isLoggedIn:
            user.isLoggedIn,

        },

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

// =====================================
// GET USER SELECTION
// =====================================

exports.getUserSelection =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user._id
        );

      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User not found",

        });

      }

      res.status(200).json({

        success: true,

        data: {

          selectedClass:
            user.selectedClass,

          selectedExamId:
            user.selectedExamId,

          selectedExamName:
            user.selectedExamName,

        },

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

