const mongoose =
  require("mongoose");

const reelLikeSchema =
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
      // REEL
      // =====================

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

    "ReelLike",

    reelLikeSchema

  );