const TopVideo =
  require(
    "../models/topVideoModel"
  );

const Subject =
  require(
    "../models/Subject"
  );

const uploadToBunny =
  require(
    "../utils/uploadToBunny"
  );

// ======================================
// CREATE TOP VIDEO
// ======================================

exports.createTopVideo =
  async (req, res) => {

    try {

      const {

        subject,
        topic,
        title,
        description,
        status,

      } = req.body;

      // ============================
      // CHECK SUBJECT
      // ============================

      const subjectData =
        await Subject.findById(
          subject
        );

      if (!subjectData) {

        return res.status(404).json({

          success: false,

          message:
            "Subject not found",

        });

      }

      // ============================
      // CHECK VIDEO FILE
      // ============================

      if (
        !req.files?.video
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Video file required",

        });

      }

      // ============================
      // VIDEO FILE
      // ============================

      const videoFile =
        req.files.video[0];

      // ============================
      // THUMBNAIL
      // ============================

      let thumbnailUrl =
        "";

      if (
        req.files?.thumbnail
      ) {

        thumbnailUrl =
          await uploadToBunny(

            req.files.thumbnail[0],

            "thumbnails"

          );

      }

      // ============================
      // UPLOAD VIDEO
      // ============================

      const videoUrl =
        await uploadToBunny(

          videoFile,

          "videos"

        );

      // ============================
      // CREATE VIDEO
      // ============================

      const video =
        await TopVideo.create({

          subject,

          topic,

          title,

          description,

          videoUrl,

          thumbnail:
            thumbnailUrl,

          status:
            status || "Active",

        });

      res.status(201).json({

        success: true,

        message:
          "Top video created successfully",

        video,

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
// GET ALL TOP VIDEOS
// ======================================

exports.getTopVideos =
  async (req, res) => {

    try {

      const videos =
        await TopVideo.find({

          status:
            "Active",

        })

          .populate(
            "subject"
          )

          .sort({

            views: -1,

            createdAt: -1,

          });

      res.status(200).json({

        success: true,

        total:
          videos.length,

        videos,

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
// GET SINGLE VIDEO
// ======================================

exports.getSingleTopVideo =
  async (req, res) => {

    try {

      const video =
        await TopVideo.findById(

          req.params.id

        ).populate(
          "subject"
        );

      if (!video) {

        return res.status(404).json({

          success: false,

          message:
            "Video not found",

        });

      }

      res.status(200).json({

        success: true,

        video,

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
// GET VIDEOS BY SUBJECT
// ======================================

exports.getVideosBySubject =
  async (req, res) => {

    try {

      const videos =
        await TopVideo.find({

          subject:
            req.params.subjectId,

          status:
            "Active",

        })

          .populate(
            "subject"
          )

          .sort({

            views: -1,

          });

      res.status(200).json({

        success: true,

        total:
          videos.length,

        videos,

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
// GET VIDEOS BY TOPIC
// ======================================

exports.getVideosByTopic =
  async (req, res) => {

    try {

      const videos =
        await TopVideo.find({

          topic:
            req.params.topic,

          status:
            "Active",

        })

          .populate(
            "subject"
          )

          .sort({

            views: -1,

          });

      res.status(200).json({

        success: true,

        total:
          videos.length,

        videos,

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
// UPDATE VIDEO
// ======================================

exports.updateTopVideo =
  async (req, res) => {

    try {

      const {

        title,
        description,
        topic,
        status,

      } = req.body;

      const video =
        await TopVideo.findById(

          req.params.id

        );

      if (!video) {

        return res.status(404).json({

          success: false,

          message:
            "Video not found",

        });

      }

      // ============================
      // UPDATE DATA
      // ============================

      if (title) {

        video.title =
          title;

      }

      if (description) {

        video.description =
          description;

      }

      if (topic) {

        video.topic =
          topic;

      }

      if (status) {

        video.status =
          status;

      }

      // ============================
      // UPDATE VIDEO
      // ============================

      if (
        req.files?.video
      ) {

        const videoUrl =
          await uploadToBunny(

            req.files.video[0],

            "videos"

          );

        video.videoUrl =
          videoUrl;

      }

      // ============================
      // UPDATE THUMBNAIL
      // ============================

      if (
        req.files?.thumbnail
      ) {

        const thumbnail =
          await uploadToBunny(

            req.files.thumbnail[0],

            "thumbnails"

          );

        video.thumbnail =
          thumbnail;

      }

      await video.save();

      res.status(200).json({

        success: true,

        message:
          "Video updated successfully",

        video,

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
// DELETE VIDEO
// ======================================

exports.deleteTopVideo =
  async (req, res) => {

    try {

      const video =
        await TopVideo.findById(

          req.params.id

        );

      if (!video) {

        return res.status(404).json({

          success: false,

          message:
            "Video not found",

        });

      }

      await TopVideo.findByIdAndDelete(

        req.params.id

      );

      res.status(200).json({

        success: true,

        message:
          "Video deleted successfully",

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
// INCREASE VIEWS
// ======================================

exports.increaseViews =
  async (req, res) => {

    try {

      const video =
        await TopVideo.findByIdAndUpdate(

          req.params.id,

          {

            $inc: {

              views: 1,

            },

          },

          {

            new: true,

          }

        );

      if (!video) {

        return res.status(404).json({

          success: false,

          message:
            "Video not found",

        });

      }

      res.status(200).json({

        success: true,

        views:
          video.views,

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