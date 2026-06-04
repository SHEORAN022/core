const mongoose =
  require("mongoose");

const subjectSchema =
  new mongoose.Schema(

    {

      // ======================
      // SUBJECT NAME
      // ======================

      name: {
        type: String,
        required: true,
        trim: true,
      },

      // ======================
      // DESCRIPTION
      // ======================

      description: {
        type: String,
        default: "",
      },

      // ======================
      // SUBJECT IMAGE
      // ======================

      image: {
        type: String,
        default: "",
      },

      // ======================
      // SUBJECT ICON
      // ======================

      icon: {
        type: String,
        default: "",
      },

      // ======================
      // STATUS
      // ======================

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
  mongoose.models.Subject ||
  mongoose.model(
    "Subject",
    subjectSchema
  );