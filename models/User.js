
const mongoose =
  require("mongoose");

const userSchema =
  new mongoose.Schema(

    {

      // ======================
      // NAME
      // ======================

      name: {

        type: String,

        required: true,

        trim: true,

      },

      // ======================
      // EMAIL
      // ======================

      email: {

        type: String,

        required: true,

        unique: true,

        trim: true,

      },

      // ======================
      // PASSWORD
      // ======================

      password: {

        type: String,

        default: "",

      },

      // ======================
      // GOOGLE ID
      // ======================

      googleId: {

        type: String,

        default: "",

      },

      // ======================
      // PROFILE IMAGE
      // ======================

      profilePic: {

        type: String,

        default: "",

      },

      // ======================
      // FEED TYPE
      // ======================

      feedType: {

        type: String,

        enum: [

          "For You",

          "Study",

          "PYQ",

        ],

        default: "For You",

      },

      // ======================
      // FOR YOU VIDEOS
      // ======================

      forYouVideos: [

        {

          type:
            mongoose.Schema.Types.ObjectId,

          ref:
            "Video",

        },

      ],

      // ======================
      // FOR YOU REELS
      // ======================

      forYouReels: [

        {

          type:
            mongoose.Schema.Types.ObjectId,

          ref:
            "Reel",

        },

      ],

      // ======================
      // STATUS
      // ======================

      status: {

        type: String,

        enum: [

          "Active",

          "Blocked",

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

    "User",

    userSchema

  );
