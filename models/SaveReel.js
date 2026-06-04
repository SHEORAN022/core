
const mongoose =
  require("mongoose");

const saveReelSchema =
  new mongoose.Schema(

    {

      // ======================
      // USER
      // ======================

      user: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

      },

      // ======================
      // REEL
      // ======================

      reel: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "ReelModel",

        required: true,

      },

    },

    {
      timestamps: true,
    }

  );

module.exports =
  mongoose.model(
    "SaveReel",
    saveReelSchema
  );

