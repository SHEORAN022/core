const Reel =
  require("../models/Reel");

const Teacher =
  require("../models/Teacher");

// =================================
// CREATE REEL
// =================================

exports.createReel =
  async (req, res) => {

    try {

      const {

        teacher,

        title,

        description,

        videoUrl,

        thumbnail,

        subject,

        chapter,

        topic,

        status,

      } = req.body;

      // ======================
      // CHECK TEACHER
      // ======================

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

      // ======================
      // CREATE REEL
      // ======================

      const reel =
        await Reel.create({

          teacher,

          title,

          description,

          videoUrl,

          thumbnail,

          subject,

          chapter,

          topic,

          status,

        });

      res.status(201).json({

        success: true,

        message:
          "Reel created successfully",

        data:
          reel,

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
// GET ALL REELS
// =================================

exports.getReels =
  async (req, res) => {

    try {

      const reels =
        await Reel.find()

          .populate("teacher")

          .sort({
            createdAt: -1,
          });

      res.status(200).json({

        success: true,

        total:
          reels.length,

        data:
          reels,

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
// GET SINGLE REEL
// =================================

exports.getSingleReel =
  async (req, res) => {

    try {

      const reel =
        await Reel.findById(
          req.params.id
        )

          .populate("teacher");

      if (!reel) {

        return res.status(404).json({

          success: false,

          message:
            "Reel not found",

        });

      }

      res.status(200).json({

        success: true,

        data:
          reel,

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
// UPDATE REEL
// =================================

exports.updateReel =
  async (req, res) => {

    try {

      const reel =
        await Reel.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }

        );

      if (!reel) {

        return res.status(404).json({

          success: false,

          message:
            "Reel not found",

        });

      }

      res.status(200).json({

        success: true,

        message:
          "Reel updated successfully",

        data:
          reel,

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
// DELETE REEL
// =================================

exports.deleteReel =
  async (req, res) => {

    try {

      const reel =
        await Reel.findByIdAndDelete(
          req.params.id
        );

      if (!reel) {

        return res.status(404).json({

          success: false,

          message:
            "Reel not found",

        });

      }

      res.status(200).json({

        success: true,

        message:
          "Reel deleted successfully",

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
// GET TEACHER REELS
// =================================

exports.getTeacherReels =
  async (req, res) => {

    try {

      const teacherId =
        req.params.teacherId;

      // ======================
      // CHECK TEACHER
      // ======================

      const teacher =
        await Teacher.findById(
          teacherId
        );

      if (!teacher) {

        return res.status(404).json({

          success: false,

          message:
            "Teacher not found",

        });

      }

      // ======================
      // GET REELS
      // ======================

      const reels =
        await Reel.find({

          teacher:
            teacherId,

        })

          .populate("teacher")

          .sort({

            createdAt: -1,

          });

      // ======================
      // RESPONSE
      // ======================

      res.status(200).json({

        success: true,

        total:
          reels.length,

        teacher,

        reels,

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