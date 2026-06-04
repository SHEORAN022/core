const mongoose =
  require("mongoose");

const topVideoSchema =
  new mongoose.Schema(

    {

      // ======================
      // SUBJECT
      // ======================

      subject: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "Subject",

        required: true,

      },

      // ======================
      // TOPIC
      // ======================

      topic: {

        type: String,

        required: true,

        trim: true,

      },

      // ======================
      // TITLE
      // ======================

      title: {

        type: String,

        required: true,

        trim: true,

      },

      // ======================
      // DESCRIPTION
      // ======================

      description: {

        type: String,

        default: "",

      },

      // ======================
      // VIDEO URL
      // ======================

      videoUrl: {

        type: String,

        required: true,

      },

      // ======================
      // THUMBNAIL
      // ======================

      thumbnail: {

        type: String,

        default: "",

      },

      // ======================
      // VIEWS
      // ======================

      views: {

        type: Number,

        default: 0,

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

    "TopVideo",

    topVideoSchema

  );