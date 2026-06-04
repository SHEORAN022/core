
const mongoose = require("mongoose");

const chapterSchema =
  new mongoose.Schema({

    title: {
      type: String,
      required: true,
      trim: true,
    },

    index: {
      type: Number,
      default: 1,
    },

    image: {
      type: String,
      default: "",
    },

  });


// ===============================
// SUBJECT SCHEMA
// ===============================

const subjectSchema =
  new mongoose.Schema({

    name: {
      type: String,
      required: true,
      trim: true,
    },

    chapters: [
      chapterSchema
    ],

  });


// ===============================
// EXAM SCHEMA
// ===============================

const examSchema =
  new mongoose.Schema(

    {

      name: {
        type: String,
        required: true,
        trim: true,
      },

      slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      description: {
        type: String,
        default: "",
      },

      image: {
        type: String,
        default: "",
      },

      subjects: [
        subjectSchema
      ],

      status: {
        type: String,
        enum: [
          "Active",
          "Draft"
        ],
        default: "Active",
      },

    },

    {
      timestamps: true
    }

  );


// ===============================
// EXPORT
// ===============================

module.exports =
  mongoose.models.Exam ||
  mongoose.model(
    "Exam",
    examSchema
  );

