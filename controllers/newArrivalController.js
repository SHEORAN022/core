
const NewArrival =
  require(
    "../models/NewArrival"
  );

const User =
  require("../models/User");

// =====================================
// CREATE NEW ARRIVAL
// =====================================

exports.createNewArrival =
  async (req, res) => {

    try {

      const {

        exam,

        title,

        subtitle,

        thumbnailUrl,

        educator,

        likes,

        duration,

      } = req.body;

      const newArrival =
        await NewArrival.create({

          exam,

          title,

          subtitle,

          thumbnailUrl,

          educator,

          likes,

          duration,

        });

      res.status(201).json({

        success: true,

        message:
          "New arrival created successfully",

        newArrival,

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
// GET ALL NEW ARRIVALS
// =====================================

exports.getNewArrivals =
  async (req, res) => {

    try {

      const currentUser =
        await User.findById(
          req.user._id
        );

      let filter = {

        isActive: true,

      };

      // ======================
      // FILTER BY EXAM
      // ======================

      if (
        currentUser &&
        currentUser.selectedExamId
      ) {

        filter.exam =
          currentUser.selectedExamId;

      }

      const newArrivals =
        await NewArrival.find(
          filter
        )

        .sort({

          createdAt: -1,

        });

      res.status(200).json({

        success: true,

        total:
          newArrivals.length,

        newArrivals,

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
// GET SINGLE NEW ARRIVAL
// =====================================

exports.getSingleNewArrival =
  async (req, res) => {

    try {

      const newArrival =
        await NewArrival.findById(

          req.params.id

        );

      if (!newArrival) {

        return res.status(404).json({

          success: false,

          message:
            "New arrival not found",

        });

      }

      res.status(200).json({

        success: true,

        newArrival,

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
// UPDATE NEW ARRIVAL
// =====================================

exports.updateNewArrival =
  async (req, res) => {

    try {

      const newArrival =
        await NewArrival.findById(
          req.params.id
        );

      if (!newArrival) {

        return res.status(404).json({

          success: false,

          message:
            "New arrival not found",

        });

      }

      const {

        title,

        subtitle,

        thumbnailUrl,

        educator,

        likes,

        duration,

        isActive,

      } = req.body;

      if (title)
        newArrival.title =
          title;

      if (
        subtitle !== undefined
      ) {

        newArrival.subtitle =
          subtitle;

      }

      if (
        thumbnailUrl
      ) {

        newArrival.thumbnailUrl =
          thumbnailUrl;

      }

      if (educator)
        newArrival.educator =
          educator;

      if (likes)
        newArrival.likes =
          likes;

      if (duration)
        newArrival.duration =
          duration;

      if (
        isActive !==
        undefined
      ) {

        newArrival.isActive =
          isActive;

      }

      await newArrival.save();

      res.status(200).json({

        success: true,

        message:
          "New arrival updated successfully",

        newArrival,

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
// DELETE NEW ARRIVAL
// =====================================

exports.deleteNewArrival =
  async (req, res) => {

    try {

      const newArrival =
        await NewArrival.findById(
          req.params.id
        );

      if (!newArrival) {

        return res.status(404).json({

          success: false,

          message:
            "New arrival not found",

        });

      }

      await newArrival.deleteOne();

      res.status(200).json({

        success: true,

        message:
          "New arrival deleted successfully",

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
// ADMIN GET ALL NEW ARRIVALS
// =====================================

exports.getAllNewArrivalsAdmin =
  async (req, res) => {

    try {

      const newArrivals =
        await NewArrival.find()

          .populate(
            "exam",
            "name"
          )

          .sort({

            createdAt: -1,

          });

      res.status(200).json({

        success: true,

        total:
          newArrivals.length,

        newArrivals,

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

