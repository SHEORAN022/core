const mongoose =
  require("mongoose");

delete mongoose.models.Reel;

const reelSchema =
  new mongoose.Schema(

    {

      // ======================================
      // RELATIONS
      // ======================================

      exam_id: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "Exam",

      },

      subject_id: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "Subject",

      },

      chapter_id: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "Chapter",

      },

      topic_id: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "Topic",

        required: true,

      },

      teacher_id: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "Teacher",

        required: true,

      },



      // ======================================
      // BASIC INFO
      // ======================================

      title: {

        type: String,

        required: true,

        trim: true,

      },

      description: {

        type: String,

        default: "",

      },



      // ======================================
      // VIDEO
      // ======================================

      video_url: {

        type: String,

        default: "",

      },

      thumbnail_url: {

        type: String,

        default: "",

      },

      source_video_url: {

        type: String,

        default: "",

      },

      hls_master_url: {

        type: String,

        default: "",

      },



      // ======================================
      // DURATION
      // ======================================

      duration: {

        type: Number,

        default: 0,

      },



      // ======================================
      // PYQ
      // ======================================

      pyq_year: {

        type: Number,

      },

      is_pyq: {

        type: Boolean,

        default: false,

      },



      // ======================================
      // PREMIUM
      // ======================================

      is_pro: {

        type: Boolean,

        default: false,

      },



      // ======================================
      // STATUS
      // ======================================

      is_active: {

        type: Boolean,

        default: true,

      },

      status: {

        type: String,

        enum: [

          "published",

          "draft",

        ],

        default: "published",

      },



      // ======================================
      // ANALYTICS
      // ======================================

      total_views: {

        type: Number,

        default: 0,

      },

      total_likes: {

        type: Number,

        default: 0,

      },

      total_comments: {

        type: Number,

        default: 0,

      },

      total_shares: {

        type: Number,

        default: 0,

      },

      total_saves: {

        type: Number,

        default: 0,

      },



      // ======================================
      // EXTRA
      // ======================================

      language: {

        type: String,

        default: "Hindi",

      },

      tags: [

        {
          type: String,
        }

      ],

    },

    {

      timestamps: true,

    }

  );



// ======================================
// INDEXES
// ======================================

reelSchema.index({
  topic_id: 1,
});

reelSchema.index({
  teacher_id: 1,
});

reelSchema.index({
  createdAt: -1,
});



// ======================================
// EXPORT
// ======================================

module.exports =
  mongoose.model(
    "Reel",
    reelSchema
  );

