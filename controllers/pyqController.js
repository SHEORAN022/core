
const Pyq =
  require("../models/Pyq");

const Subject =
  require("../models/Subject");

const uploadToBunny =
  require("../utils/uploadToBunny");

// ===================================
// CREATE PYQ
// ===================================

exports.createPyq =
  async (req, res) => {

    try {

      const {

        subject,

        title,

        description,

        videoLink,

        chapter,

        topic,

        year,

        status,

      } = req.body;

      // =========================
      // CHECK SUBJECT
      // =========================

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

      // =========================
      // VIDEO URL
      // =========================

      let videoUrl = "";

      // =========================
      // VIDEO FILE UPLOAD
      // =========================

      if (

        req.files &&

        req.files.video &&

        req.files.video[0]

      ) {

        videoUrl =

          await uploadToBunny(

            req.files.video[0],

            "pyq-videos"

          );

      }

      // =========================
      // VIDEO LINK
      // =========================

      else if (videoLink) {

        videoUrl =
          videoLink;

      }

      // =========================
      // THUMBNAIL
      // =========================

      let thumbnail = "";

      if (

        req.files &&

        req.files.thumbnail &&

        req.files.thumbnail[0]

      ) {

        thumbnail =

          await uploadToBunny(

            req.files.thumbnail[0],

            "pyq-thumbnails"

          );

      }

      // =========================
      // CREATE PYQ
      // =========================

      const pyq =
        await Pyq.create({

          subject,

          title,

          description,

          videoUrl,

          thumbnail,

          chapter,

          topic,

          year,

          status,

        });

      // =========================
      // RESPONSE
      // =========================

      res.status(201).json({

        success: true,

        message:
          "PYQ created successfully",

        data:
          pyq,

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

// ===================================
// GET ALL PYQS
// ===================================

exports.getPyqs =
  async (req, res) => {

    try {

      const pyqs =
        await Pyq.find()

          .populate("subject")

          .sort({

            createdAt: -1,

          });

      res.status(200).json({

        success: true,

        total:
          pyqs.length,

        data:
          pyqs,

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

// ===================================
// GET SINGLE PYQ
// ===================================

exports.getSinglePyq =
  async (req, res) => {

    try {

      const pyq =
        await Pyq.findById(

          req.params.id

        ).populate("subject");

      if (!pyq) {

        return res.status(404).json({

          success: false,

          message:
            "PYQ not found",

        });

      }

      res.status(200).json({

        success: true,

        data:
          pyq,

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

// ===================================
// UPDATE PYQ
// ===================================

exports.updatePyq =
  async (req, res) => {

    try {

      const {

        subject,

        title,

        description,

        videoLink,

        chapter,

        topic,

        year,

        status,

      } = req.body;

      // =========================
      // FIND PYQ
      // =========================

      const pyq =
        await Pyq.findById(

          req.params.id

        );

      if (!pyq) {

        return res.status(404).json({

          success: false,

          message:
            "PYQ not found",

        });

      }

      // =========================
      // VIDEO
      // =========================

      let videoUrl =
        pyq.videoUrl;

      // FILE UPLOAD

      if (

        req.files &&

        req.files.video &&

        req.files.video[0]

      ) {

        videoUrl =

          await uploadToBunny(

            req.files.video[0],

            "pyq-videos"

          );

      }

      // VIDEO LINK

      else if (videoLink) {

        videoUrl =
          videoLink;

      }

      // =========================
      // THUMBNAIL
      // =========================

      let thumbnail =
        pyq.thumbnail;

      if (

        req.files &&

        req.files.thumbnail &&

        req.files.thumbnail[0]

      ) {

        thumbnail =

          await uploadToBunny(

            req.files.thumbnail[0],

            "pyq-thumbnails"

          );

      }

      // =========================
      // UPDATE
      // =========================

      const updatedPyq =

        await Pyq.findByIdAndUpdate(

          req.params.id,

          {

            subject,

            title,

            description,

            videoUrl,

            thumbnail,

            chapter,

            topic,

            year,

            status,

          },

          {

            new: true,

          }

        );

      res.status(200).json({

        success: true,

        message:
          "PYQ updated successfully",

        data:
          updatedPyq,

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

// ===================================
// DELETE PYQ
// ===================================

exports.deletePyq =
  async (req, res) => {

    try {

      const pyq =
        await Pyq.findByIdAndDelete(

          req.params.id

        );

      if (!pyq) {

        return res.status(404).json({

          success: false,

          message:
            "PYQ not found",

        });

      }

      res.status(200).json({

        success: true,

        message:
          "PYQ deleted successfully",

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