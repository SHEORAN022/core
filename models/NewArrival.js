
const mongoose =
  require("mongoose");

const newArrivalSchema =
  new mongoose.Schema(

    {

     

      exam: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Exam",

        required: true,

      },

      // ======================
      // TITLE
      // ======================

      title: {

        type: String,

        required: true,

      },

      // ======================
      // SUBTITLE
      // ======================

      subtitle: {

        type: String,

        default: "",

      },

      // ======================
      // THUMBNAIL
      // ======================

      thumbnailUrl: {

        type: String,

        default: "",

      },

      // ======================
      // EDUCATOR
      // ======================

      educator: {

        type: String,

        default: "",

      },

      // ======================
      // UPLOAD DATE
      // ======================

      uploadDate: {

        type: Date,

        default: Date.now,

      },

      // ======================
      // LIKES
      // ======================

      likes: {

        type: Number,

        default: 0,

      },

      // ======================
      // DURATION
      // ======================

      duration: {

        type: Number,

        default: 0,

      },

      // ======================
      // ACTIVE
      // ======================

      isActive: {

        type: Boolean,

        default: true,

      },

    },

    {
      timestamps: true,
    }

  );

module.exports =
  mongoose.model(
    "NewArrival",
    newArrivalSchema
  );

