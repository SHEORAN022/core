
const mongoose =
  require("mongoose");

const teacherSchema =
  new mongoose.Schema(

    {

      // ======================
      // BASIC DETAILS
      // ======================

      teacherName: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        default: "",
        trim: true,
      },

      phone: {
        type: String,
        default: "",
        trim: true,
      },

      profileImage: {
        type: String,
        default: "",
      },

      // ======================
      // PROFESSIONAL DETAILS
      // ======================

      qualification: {
        type: String,
        default: "",
        trim: true,
      },

      experience: {
        type: Number,
        default: 0,
      },

      description: {
        type: String,
        default: "",
        trim: true,
      },

      // ======================
      // SUBJECTS
      // ======================

      subjects: [

        {
          type: String,
          trim: true,
        },

      ],

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

      toJSON: {
        virtuals: true,
      },

      toObject: {
        virtuals: true,
      },

    }

  );

// ======================
// VIRTUAL REELS
// ======================

teacherSchema.virtual(
  "reels",
  {

    ref: "Reel",

    localField: "_id",

    // IMPORTANT
    foreignField: "teacherId",

  }
);

// ======================
// EXPORT MODEL
// ======================

module.exports =
  mongoose.models.Teacher ||
  mongoose.model(
    "Teacher",
    teacherSchema
  );

