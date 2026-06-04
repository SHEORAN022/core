const mongoose =
  require("mongoose");

const assessmentSchema =
  new mongoose.Schema(

    {

      title: {
        type: String,
        required: true,
      },

      type: {
        type: String,

        enum: [
          "mock_test",
          "weekly_test",
          "subject_test",
          "chapter_test",
          "full_length_test",
          "quiz",
          "daily",
          "test",
          "mock",
          "pyq",
        ],

        required: true,
      },

      exam_id: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Exam",
      },

      teacher_id: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },

      subject_id: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },

      chapter_id: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
      },

      topic_id: {

  type:
    mongoose.Schema.Types.ObjectId,

  ref:
    "Topic",

},

      duration: {
        type: Number,
        default: 60,
      },

      total_questions: {
        type: Number,
        default: 0,
      },

      negative_marking: {
        type: Boolean,
        default: false,
      },

      leaderboard_enabled: {
        type: Boolean,
        default: true,
      },

      is_pro: {
        type: Boolean,
        default: false,
      },

      is_active: {
        type: Boolean,
        default: true,
      },

      is_deleted: {
        type: Boolean,
        default: false,
      },

      thumbnail_url: {
        type: String,
        default: "",
      },

      start_at: Date,

      end_at: Date,

    },

    {
      timestamps: true,
    }

  );

module.exports =
  mongoose.model(
    "Assessment",
    assessmentSchema
  );