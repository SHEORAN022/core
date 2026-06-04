// const mongoose = require("mongoose");

// const reelSchema = new mongoose.Schema(
//   {
//     topicId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Topic",
//       required: true,
//     },

//     teacherId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Teacher",
//       required: true,
//     },

//     title: {
//       type: String,
//       required: true,
//     },

//     description: String,

//     videoUrl: String,

//     thumbnailUrl: String,

//     duration: Number,

//     isPremium: {
//       type: Boolean,
//       default: false,
//     },

//     status: {
//       type: String,
//       enum: ["published", "draft"],
//       default: "published",
//     },
//   },
//   { timestamps: true }
// );

// module.exports =
//   mongoose.models.Reel ||
//   mongoose.model("Reel", reelSchema);

const mongoose =
  require("mongoose");

const reelSchema =
  new mongoose.Schema(
    {
      topic_id: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Topic",
        required: true,
      },

      teacher_id: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
      },

      video_url: {
        type: String,
      },

      thumbnail_url: {
        type: String,
      },

      duration: {
        type: Number,
      },

      source_video_url: {
        type: String,
      },

      hls_master_url: {
        type: String,
      },

      pyq_year: {
        type: Number,
      },

      is_pyq: {
        type: Boolean,
        default: false,
      },

      is_pro: {
        type: Boolean,
        default: false,
      },

      is_active: {
        type: Boolean,
        default: true,
      },
    },

    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.models.Reel ||
  mongoose.model(
    "Reel",
    reelSchema
  );