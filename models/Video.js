// const mongoose = require("mongoose");

// const videoSchema = new mongoose.Schema(
//   {
//     // =====================
//     // SUBJECT
//     // =====================
//     subject: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Subject",
//       required: true,
//     },

//     // =====================
//     // CHAPTER
//     // =====================
//     chapter: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     // =====================
//     // TOPIC
//     // =====================
//     topic: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     // =====================
//     // TITLE
//     // =====================
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     // =====================
//     // DESCRIPTION
//     // =====================
//     description: {
//       type: String,
//       default: "",
//     },

//     // =====================
//     // VIDEO URL
//     // =====================
//     videoUrl: {
//       type: String,
//       default: "",
//     },

//     // =====================
//     // THUMBNAIL
//     // =====================
//     thumbnail: {
//       type: String,
//       default: "",
//     },

//     // =====================
//     // STATUS
//     // =====================
//     status: {
//       type: String,
//       enum: ["Active", "Inactive"],
//       default: "Active",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Video", videoSchema);



const mongoose =
  require("mongoose");

const videoSchema =
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
      // CHAPTER
      // =====================

      chapter: {

        type: String,

        required: true,

        trim: true,

      },

      // =====================
      // TOPIC
      // =====================

      topic: {

        type: String,

        required: true,

        trim: true,

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
      // VIDEO TYPE
      // =====================

      type: {

        type: String,

        enum: [

          "ForYou",

          "Study",

          "PYQ",

        ],

        default: "Study",

      },

      // =====================
      // ANALYTICS
      // =====================

      views: {

        type: Number,

        default: 0,

      },

      likes: {

        type: Number,

        default: 0,

      },

      shares: {

        type: Number,

        default: 0,

      },

      saves: {

        type: Number,

        default: 0,

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
    "Video",
    videoSchema
  );

