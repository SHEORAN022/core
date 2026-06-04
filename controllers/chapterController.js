// const Chapter = require("../models/chapterModel");

// exports.createChapter = async (req, res) => {
//   try {
//     const chapter = await Chapter.create(req.body);

//     res.status(201).json({
//       success: true,
//       chapter,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// exports.getChaptersBySubject = async (req, res) => {
//   try {
//     const chapters = await Chapter.find({
//       subjectId: req.params.subjectId,
//       isDeleted: false,
//     });

//     res.json({
//       success: true,
//       chapters,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const Chapter =
  require("../models/chapterModel");



// ======================================
// CREATE CHAPTER
// ======================================

exports.createChapter =
  async (req, res) => {

    try {

      const {

        subjectId,
        name,

      } = req.body;

      if (!subjectId) {

        return res.status(400).json({

          success: false,

          message:
            "Subject ID is required",

        });

      }

      if (!name) {

        return res.status(400).json({

          success: false,

          message:
            "Chapter name is required",

        });

      }

      const chapter =
        await Chapter.create({

          subjectId,
          name,

        });

      res.status(201).json({

        success: true,

        message:
          "Chapter created successfully",

        chapter,

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
// GET CHAPTERS BY SUBJECT
// ======================================

exports.getChaptersBySubject =
  async (req, res) => {

    try {

      const chapters =
        await Chapter.find({

          subjectId:
            req.params.subjectId,

          isDeleted: false,

        })

        .sort({
          createdAt: -1,
        });

      res.status(200).json({

        success: true,

        count:
          chapters.length,

        chapters,

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
// GET SINGLE CHAPTER
// ======================================

exports.getSingleChapter =
  async (req, res) => {

    try {

      const chapter =
        await Chapter.findById(
          req.params.id
        );

      if (!chapter) {

        return res.status(404).json({

          success: false,

          message:
            "Chapter not found",

        });

      }

      res.status(200).json({

        success: true,

        chapter,

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
// UPDATE CHAPTER
// ======================================

exports.updateChapter =
  async (req, res) => {

    try {

      const chapter =
        await Chapter.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }

        );

      if (!chapter) {

        return res.status(404).json({

          success: false,

          message:
            "Chapter not found",

        });

      }

      res.status(200).json({

        success: true,

        message:
          "Chapter updated successfully",

        chapter,

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
// DELETE CHAPTER
// ======================================

exports.deleteChapter =
  async (req, res) => {

    try {

      const chapter =
        await Chapter.findByIdAndUpdate(

          req.params.id,

          {
            isDeleted: true,
          },

          {
            new: true,
          }

        );

      if (!chapter) {

        return res.status(404).json({

          success: false,

          message:
            "Chapter not found",

        });

      }

      res.status(200).json({

        success: true,

        message:
          "Chapter deleted successfully",

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };