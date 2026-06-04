const mongoose =
  require("mongoose");

const leaderboardSchema =
  new mongoose.Schema(

    {

      assessment_id: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Assessment",

        required: true,

      },

      user_id: String,

      user_name: String,

      score: Number,

      rank: Number,

      accuracy: Number,

      correct_answers: Number,

      wrong_answers: Number,

      time_spent: Number,

      submitted_at: {

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
    "Leaderboard",
    leaderboardSchema
  );