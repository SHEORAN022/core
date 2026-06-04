const mongoose =
  require("mongoose");

const continueWatchingSchema =
  new mongoose.Schema(

    {

      // =====================
      // USER
      // =====================

      user: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

      },

      // =====================
      // VIDEO
      // =====================

      video: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Video",

        required: true,

      },

      // =====================
      // WATCHED SECONDS
      // =====================

      watchedSeconds: {

        type: Number,

        default: 0,

      },

      // =====================
      // TOTAL DURATION
      // =====================

      durationSeconds: {

        type: Number,

        default: 0,

      },

      // =====================
      // COMPLETED
      // =====================

      isCompleted: {

        type: Boolean,

        default: false,

      },

      // =====================
      // LAST WATCHED
      // =====================

      lastWatchedAt: {

        type: Date,

        default: Date.now,

      },

    },

    {
      timestamps: true,
    }

  );

module.exports =
  mongoose.model(
    "ContinueWatching",
    continueWatchingSchema
  );