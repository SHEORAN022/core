// models/Category.js

const mongoose =
  require("mongoose");

const categorySchema =
  new mongoose.Schema(

    {

      // ======================
      // CATEGORY NAME
      // ======================

      name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
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
  mongoose.model(
    "Category",
    categorySchema
  );