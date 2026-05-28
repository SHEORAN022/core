const mongoose = require("mongoose");
const testSchema = new mongoose.Schema(

  {

    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      default: "",
    },

    totalQuestions: {
      type: Number,
      default: 0,
    },

    duration: {
      type: Number,
      default: 180,
    },

    category: {
      type: String,
      default: "",
    },

    imagePath: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Active", "Draft"],
      default: "Active",
    },

  },

  { timestamps: true }

);

module.exports =
  mongoose.model("Test", testSchema);