const mongoose =
  require("mongoose");

const pyqSchema =
  new mongoose.Schema(

    {

      // =====================
      // SUBJECT
      // =====================

      subject: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "Subject",

        required: true,

      },

      // =====================
      // TITLE
      // =====================

      title: {

        type: String,

        required: true,

        trim: true,

      },

      // =====================
      // DESCRIPTION
      // =====================

      description: {

        type: String,

        default: "",

      },

      // =====================
      // VIDEO URL
      // =====================

      videoUrl: {

        type: String,

        default: "",

      },

      // =====================
      // THUMBNAIL
      // =====================

      thumbnail: {

        type: String,

        default: "",

      },

      // =====================
      // CHAPTER
      // =====================

      chapter: {

        type: String,

        default: "",

      },

      // =====================
      // TOPIC
      // =====================

      topic: {

        type: String,

        default: "",

      },

      // =====================
      // YEAR
      // =====================

      year: {

        type: Number,

      },

      // =====================
      // STATUS
      // =====================

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

    "Pyq",

    pyqSchema

  );