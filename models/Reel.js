const mongoose =
  require("mongoose");

const reelSchema =
  new mongoose.Schema(

    {

      // ======================
      // TEACHER
      // ======================

      teacher: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "Teacher",

        required: true,
      },

      // ======================
      // REEL DETAILS
      // ======================

      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        default: "",
      },

      videoUrl: {
        type: String,
        required: true,
      },

      thumbnail: {
        type: String,
        default: "",
      },

      // ======================
      // ANALYTICS
      // ======================

      subject: {
        type: String,
        default: "",
      },

      chapter: {
        type: String,
        default: "",
      },

      topic: {
        type: String,
        default: "",
      },

      // ======================
      // STATUS
      // ======================

      status: {
        type: String,

        enum: [
          "Active",
          "Inactive",
        ],

        default: "Active",
      },

    },

    {
      timestamps: true,
    }

  );

module.exports =
  mongoose.model(
    "Reel",
    reelSchema
  );