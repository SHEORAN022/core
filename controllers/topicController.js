// const Topic = require("../models/topicModel");

// exports.createTopic = async (req, res) => {
//   try {
//     const topic = await Topic.create(req.body);

//     res.status(201).json({
//       success: true,
//       topic,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// exports.getTopicsByChapter = async (req, res) => {
//   try {
//     const topics = await Topic.find({
//       chapterId: req.params.chapterId,
//       isDeleted: false,
//     });

//     res.json({
//       success: true,
//       topics,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const Topic =
  require("../models/topicModel");



// ======================================
// CREATE TOPIC
// ======================================

exports.createTopic =
  async (req, res) => {

    try {

      const {

        chapterId,
        name,

      } = req.body;

      // VALIDATION

      if (!chapterId) {

        return res.status(400).json({

          success: false,

          message:
            "Chapter ID is required",

        });

      }

      if (!name) {

        return res.status(400).json({

          success: false,

          message:
            "Topic name is required",

        });

      }

      // CREATE

      const topic =
        await Topic.create({

          chapterId,
          name,

        });

      res.status(201).json({

        success: true,

        message:
          "Topic created successfully",

        topic,

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
// GET TOPICS BY CHAPTER
// ======================================

exports.getTopicsByChapter =
  async (req, res) => {

    try {

      const topics =
        await Topic.find({

          chapterId:
            req.params.chapterId,

          isDeleted: false,

        })

        .sort({
          createdAt: -1,
        });

      res.status(200).json({

        success: true,

        count:
          topics.length,

        topics,

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
// GET SINGLE TOPIC
// ======================================

exports.getSingleTopic =
  async (req, res) => {

    try {

      const topic =
        await Topic.findById(
          req.params.id
        );

      if (!topic) {

        return res.status(404).json({

          success: false,

          message:
            "Topic not found",

        });

      }

      res.status(200).json({

        success: true,

        topic,

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
// UPDATE TOPIC
// ======================================

exports.updateTopic =
  async (req, res) => {

    try {

      const topic =
        await Topic.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }

        );

      if (!topic) {

        return res.status(404).json({

          success: false,

          message:
            "Topic not found",

        });

      }

      res.status(200).json({

        success: true,

        message:
          "Topic updated successfully",

        topic,

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
// DELETE TOPIC
// ======================================

exports.deleteTopic =
  async (req, res) => {

    try {

      const topic =
        await Topic.findByIdAndUpdate(

          req.params.id,

          {
            isDeleted: true,
          },

          {
            new: true,
          }

        );

      if (!topic) {

        return res.status(404).json({

          success: false,

          message:
            "Topic not found",

        });

      }

      res.status(200).json({

        success: true,

        message:
          "Topic deleted successfully",

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };