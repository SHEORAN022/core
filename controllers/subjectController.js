const Subject =
  require("../models/Subject");

const uploadToBunny =
  require("../utils/uploadToBunny");

// =================================
// CREATE SUBJECT
// =================================

exports.createSubject =
  async (req, res) => {

    try {

      console.log(
        "BODY =>",
        req.body
      );

      console.log(
        "FILES =>",
        req.files
      );

      // ======================
      // GET DATA
      // ======================

      const name =
        req.body?.name;

      const description =
        req.body?.description;

      const status =
        req.body?.status;

      // ======================
      // VALIDATION
      // ======================

      if (
        !name ||
        name.trim() === ""
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Subject name is required",

        });

      }

      // ======================
      // CHECK SUBJECT
      // ======================

      const alreadyExists =
        await Subject.findOne({

          name,

        });

      if (alreadyExists) {

        return res.status(400).json({

          success: false,

          message:
            "Subject already exists",

        });

      }

      // ======================
      // IMAGE UPLOAD
      // ======================

      let image = "";

      if (
        req.files &&
        req.files.image &&
        req.files.image[0]
      ) {

        image =
          await uploadToBunny(

            req.files.image[0],

            "subjects"

          );

      }

      // ======================
      // ICON UPLOAD
      // ======================

      let icon = "";

      if (
        req.files &&
        req.files.icon &&
        req.files.icon[0]
      ) {

        icon =
          await uploadToBunny(

            req.files.icon[0],

            "subjects"

          );

      }

      // ======================
      // CREATE SUBJECT
      // ======================

      const subject =
        await Subject.create({

          name,

          description,

          image,

          icon,

          status,

        });

      // ======================
      // RESPONSE
      // ======================

      res.status(201).json({

        success: true,

        message:
          "Subject created successfully",

        data:
          subject,

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
// GET ALL SUBJECTS
// =================================

exports.getSubjects =
  async (req, res) => {

    try {

      const subjects =
        await Subject.find()

          .sort({

            createdAt: -1,

          });

      res.status(200).json({

        success: true,

        total:
          subjects.length,

        data:
          subjects,

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
// GET SINGLE SUBJECT
// =================================

exports.getSingleSubject =
  async (req, res) => {

    try {

      const subject =
        await Subject.findById(

          req.params.id

        );

      if (!subject) {

        return res.status(404).json({

          success: false,

          message:
            "Subject not found",

        });

      }

      res.status(200).json({

        success: true,

        data:
          subject,

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
// UPDATE SUBJECT
// =================================

exports.updateSubject =
  async (req, res) => {

    try {

      const updateData = {

        ...req.body,

      };

      // ======================
      // UPDATE IMAGE
      // ======================

      if (
        req.files &&
        req.files.image &&
        req.files.image[0]
      ) {

        updateData.image =
          await uploadToBunny(

            req.files.image[0],

            "subjects"

          );

      }

      // ======================
      // UPDATE ICON
      // ======================

      if (
        req.files &&
        req.files.icon &&
        req.files.icon[0]
      ) {

        updateData.icon =
          await uploadToBunny(

            req.files.icon[0],

            "subjects"

          );

      }

      // ======================
      // UPDATE SUBJECT
      // ======================

      const subject =
        await Subject.findByIdAndUpdate(

          req.params.id,

          updateData,

          {

            new: true,

          }

        );

      if (!subject) {

        return res.status(404).json({

          success: false,

          message:
            "Subject not found",

        });

      }

      // ======================
      // RESPONSE
      // ======================

      res.status(200).json({

        success: true,

        message:
          "Subject updated successfully",

        data:
          subject,

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
// DELETE SUBJECT
// =================================

exports.deleteSubject =
  async (req, res) => {

    try {

      const subject =
        await Subject.findByIdAndDelete(

          req.params.id

        );

      if (!subject) {

        return res.status(404).json({

          success: false,

          message:
            "Subject not found",

        });

      }

      res.status(200).json({

        success: true,

        message:
          "Subject deleted successfully",

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