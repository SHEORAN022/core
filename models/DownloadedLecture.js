// =====================================
// models/DownloadedLecture.js
// =====================================

const mongoose =
  require("mongoose");

const downloadedLectureSchema =
  new mongoose.Schema(

    {

      // USER

      user: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

      },

      // REEL

      reel: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "ReelModel",

        required: true,

      },

      // FILE SIZE

      fileSize: {

        type: String,

        default: "0 MB",

      },

      // FILE TYPE

      fileType: {

        type: String,

        enum: [

          "MP4",

          "PDF",

        ],

        default: "MP4",

      },

    },

    {

      timestamps: true,

    }

  );

module.exports =
  mongoose.model(

    "DownloadedLecture",

    downloadedLectureSchema

  );